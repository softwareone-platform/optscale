export type CreatePoolFormValues = {
  name: string;
  limit: string;
  type: string;
  defaultOwnerId: string;
  autoExtension: boolean;
};

export type EditPoolFormValues = {
  name: string;
  limit: string;
  type: string;
  defaultOwnerId: string;
  autoExtension: boolean;
};

export type CreatePoolFormProps = {
  parentId: string;
  onSuccess: () => void;
  unallocatedLimit: number;
};
