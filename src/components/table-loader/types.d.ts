export interface TableLoaderProps {
  headers: string[];
  rowCount?: number;
  SkeletonRow?: React.ComponentType<{ index?: number }>;
  scrollable?: boolean;
  tableClassName?: string;
  column?: number;
}
