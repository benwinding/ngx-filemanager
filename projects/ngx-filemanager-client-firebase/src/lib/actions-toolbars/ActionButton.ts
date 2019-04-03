import { Observable } from 'rxjs';

export interface ActionButton {
  label: string;
  onClick: (item: ActionButton) => void;
  icon: string;
  color: string;
  $disabled?: Observable<boolean>;
}
