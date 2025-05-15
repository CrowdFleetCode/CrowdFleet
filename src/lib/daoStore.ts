export type DaoGroup = {
  id: string;
  name: string;
  creator: string;
  goalAmount: number;
  currentAmount: number;
  members: {
    address: string;
    contribution: number;
    nftMetadataUrl?: string;
  }[];
};

export function saveDaoGroup(group: DaoGroup) {
  const existing = getDaoGroups();
  existing.push(group);
  localStorage.setItem("daoGroups", JSON.stringify(existing));
}

export function getDaoGroups(): DaoGroup[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("daoGroups");
  return data ? JSON.parse(data) : [];
}

export function getDaoGroupById(id: string): DaoGroup | null {
  const all = getDaoGroups();
  return all.find((g) => g.id === id) || null;
}