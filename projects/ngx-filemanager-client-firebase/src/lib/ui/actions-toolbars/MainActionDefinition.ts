import { Observable } from 'rxjs';

export interface MainActionDefinition {
  label: string;
  icon: string;
  color?: string;
  $disabled?: Observable<boolean>;
  onClick: () => Promise<void>;
}
