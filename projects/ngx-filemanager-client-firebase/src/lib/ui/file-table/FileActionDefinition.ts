import { CoreTypes } from '../../../core-types';

export interface FileActionDefinition {
  label: string;
  icon: string;
  color?: string;
  onClick: (row: CoreTypes.ResFile) => void;
}
