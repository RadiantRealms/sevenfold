"use client";

import { useEffect, useState } from "react";
import EditGroupForm from "@/components/groups/edit-group-form";
import LoadingComponent from "@/components/common/loading-component";
import ErrorMessage from "@/components/common/error-message";
import { GroupType } from "@/lib/types";

interface IParams {
  groupId: string;
}

export default function EditGroupPage({ params }: { params: IParams }) {
  const [state, setState] = useState<{
    group: GroupType | null;
    isLoading: boolean;
    error: string | null;
  }>({
    group: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchGroup = await fetch(`/api/groups/${params.groupId}`);
        if (!fetchGroup.ok) throw new Error("Failed to fetch group");

        const group: GroupType = await fetchGroup.json();

        setState({ group, isLoading: false, error: null });
      } catch (error) {
        setState({
          group: null,
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchData();
  }, [params.groupId]);

  if (state.isLoading)
    return (
      <main>
        <LoadingComponent />
      </main>
    );

  if (state.error)
    return (
      <main>
        <ErrorMessage error={state.error} />
      </main>
    );

  return <main>{state.group && <EditGroupForm group={state.group} />}</main>;
}
