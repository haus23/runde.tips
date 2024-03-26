import { toast } from 'sonner';
import type { Toast } from './types';

function _toast(type: Toast['type'], text: string) {
  toast[type](text);
}

export { _toast as toast };
