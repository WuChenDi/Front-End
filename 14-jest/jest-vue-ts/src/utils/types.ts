import { PropType } from "vue";

export const HeaderPropsDefine = {
  add: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
} as const;

export const UnDoListPropsDefine = {
  list: {
    type: Object as PropType<UnDoListType[]>,
    required: true,
  },
  delete: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  status: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  reset: {
    type: Function as PropType<() => void>,
    required: true,
  },
  change: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
} as const;

export interface UnDoListType {
  status: string;
  value: string;
}

export interface UnDoChangeParameter {
  value: string;
  index: number;
}
