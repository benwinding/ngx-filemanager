import { Observable } from 'rxjs';
import { CoreTypes } from '../../../core-types';

export interface BulkActionDefinition {
  onClick: (item: CoreTypes.ResFile[]) => Promise<void>;
  label: string;
  icon: string;
  color?: string;
  $disabled?: Observable<boolean>;
}
