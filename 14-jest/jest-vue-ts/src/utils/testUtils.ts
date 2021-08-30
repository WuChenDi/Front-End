export const findTestWrapper = (wrapper: any, tag: string) => {
  return wrapper.find(`[data-test = "${tag}"]`);
};
