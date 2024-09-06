/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function getValueByKey(obj: Object, key: string) {
  return key.split(".").reduce((acc: any, part) => acc && acc[part], obj);
}

export const tableLimit = 4;
export const tableAudience = 16;
