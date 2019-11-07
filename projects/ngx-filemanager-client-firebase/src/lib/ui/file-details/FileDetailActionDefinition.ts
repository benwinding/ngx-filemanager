import { CoreTypes } from '../../../core-types';
import { Observable } from 'rxjs';

export interface FileDetailActionDefinition {
  label: string;
  icon: string;
  color?: string;
  toolTip?: string;
  $disabled?: Observable<boolean>;
  onClick: (file: CoreTypes.ResFile) => Promise<void>;
}
