export const getRowIdentity = <T>(row: T, rowKey: string | ((row: T) => any)): string => {
  if (!row) throw new Error('row is required when get row identity');
  if (typeof rowKey === 'string') {
    if (rowKey.indexOf('.') < 0) {
      return row[rowKey];
    }
    let key = rowKey.split('.');
    let current = row;
    for (let i = 0; i < key.length; i++) {
      current = current[key[i]];
    }
    return `${current}`;
  } else if (typeof rowKey === 'function') {
    // eslint-disable-next-line no-useless-call
    return rowKey.call(null, row);
  }
  return '';
};

export const getKeysMap = function <T>(array: T[], rowKey: string): Record<string, { row: T; index: number }> {
  const arrayMap = {};
  (array || []).forEach((row, index) => {
    arrayMap[getRowIdentity(row, rowKey)] = {
      row,
      index
    };
  });
  return arrayMap;
};

export function toggleRowStatus<T>(
  statusArr: T[],
  row: T,
  newVal: boolean,
  rowKey: string | ((row: T) => any)
): boolean {
  let changed = false;
  // const index = statusArr.indexOf(row);
  const index = getSelectRowsIndex(statusArr, row, rowKey);
  const included = index !== -1;

  const addRow = () => {
    statusArr.push(row);
    changed = true;
  };
  const removeRow = () => {
    statusArr.splice(index, 1);
    changed = true;
  };

  if (typeof newVal === 'boolean') {
    if (newVal && !included) {
      addRow();
    } else if (!newVal && included) {
      removeRow();
    }
  } else {
    if (included) {
      removeRow();
    } else {
      addRow();
    }
  }
  return changed;
}

export function getSelectRowsIndex<T>(array: T[], row: T, rowKey: string | ((row: T) => any)): number {
  if (!row) throw new Error('row is required when get row identity');

  // eslint-disable-next-line no-useless-call
  const key = typeof rowKey === 'string' ? rowKey : typeof rowKey === 'function' ? rowKey.call(null, row) : '';

  const arrayMap = array.map(i => i[key]);
  return arrayMap.indexOf(getRowIdentity(row, rowKey));
}

export function isSelected<T>(array: T[], row: T, rowKey: string | ((row: T) => any)): boolean {
  let selectedMap;

  if (rowKey) {
    // eslint-disable-next-line no-useless-call
    const key = typeof rowKey === 'string' ? rowKey : typeof rowKey === 'function' ? rowKey.call(null, row) : '';
    selectedMap = getKeysMap(array, key);
  }

  if (selectedMap) {
    return !!selectedMap[getRowIdentity(row, rowKey)];
  } else {
    // return array.indexOf(row) !== -1;
    return getSelectRowsIndex(array, row, rowKey) !== -1;
  }
}
