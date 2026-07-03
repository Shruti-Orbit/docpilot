"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import DocumentsHeader from "./DocumentsHeader";
import DocumentFilters from "./DocumentFilters";
import DocumentsTable from "./DocumentsTable";
import EmptyState from "./EmptyState";
import {
  deleteDocument,
  getDocuments,
  uploadDocument,
} from "@/services/document.service";
import { getWorkspaces } from "@/services/workspace.service";

interface Workspace {
  _id: string;
  name: string;
}

export interface DocumentItem {
  _id: string;
  originalName: string;
  workspace: string;
  workspaceName: string;
  status: string;
  fileSize: number;
  createdAt: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [search, setSearch] = useState("");
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);

    try {
      const workspacesResponse = await getWorkspaces();
      const workspaceList: Workspace[] = workspacesResponse.data || [];

      setWorkspaces(workspaceList);

      const documentResponses = await Promise.all(
        workspaceList.map((workspace) => getDocuments(workspace._id))
      );

      const nextDocuments = documentResponses.flatMap((response, index) => {
        const workspace = workspaceList[index];

        return (response.data || []).map((document: DocumentItem) => ({
          ...document,
          workspaceName: workspace?.name || "Unknown",
        }));
      });

      setDocuments(
        nextDocuments.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(fetchDocuments);
  }, [fetchDocuments]);

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const matchesSearch = document.originalName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesWorkspace =
        selectedWorkspaceId === "all" ||
        document.workspace === selectedWorkspaceId;

      return matchesSearch && matchesWorkspace;
    });
  }, [documents, search, selectedWorkspaceId]);

  const handleUpload = async (file: File) => {
    const workspaceId =
      selectedWorkspaceId !== "all"
        ? selectedWorkspaceId
        : workspaces[0]?._id;

    if (!workspaceId) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("workspaceId", workspaceId);

    setIsUploading(true);

    try {
      await uploadDocument(formData);
      await fetchDocuments();
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDocument(id);
    await fetchDocuments();
  };

  return (
    <div className="space-y-6">

      <DocumentsHeader
        onUpload={handleUpload}
        isUploading={isUploading}
      />

      <DocumentFilters
        search={search}
        selectedWorkspaceId={selectedWorkspaceId}
        workspaces={workspaces}
        onSearchChange={setSearch}
        onWorkspaceChange={setSelectedWorkspaceId}
      />

      {isLoading || documents.length > 0 ? (
        <DocumentsTable
          documents={filteredDocuments}
          isLoading={isLoading}
          onDelete={handleDelete}
        />
      ) : (
        <EmptyState
          onUpload={handleUpload}
          isUploading={isUploading}
        />
      )}

    </div>
  );
}
