export type Theater = {
  id: string;
  slug: string;
  name: string;
  location: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
};

/** Fields an admin may set. Server-managed fields (id, timestamps) are excluded. */
export type TheaterInput = Omit<Theater, "id" | "createdAt" | "updatedAt">;

export type CreateTheaterInput = Pick<TheaterInput, "name" | "location" | "capacity"> & Partial<TheaterInput>;

export type UpdateTheaterInput = Partial<TheaterInput>;

export type TheaterFilters = {
  /** Case-insensitive match on name or location. */
  q?: string;
};
