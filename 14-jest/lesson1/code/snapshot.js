export const generateConfig = () => {
  return {
    sever: "localhost",
    port: 8080,
    proxy: 8081,
  };
};

export const generateAnotherConfig = () => {
  return {
    sever: "localhost",
    port: 8080,
    proxy: 8082,
  };
};

export const generateTimeConfig = () => {
  return {
    sever: "localhost",
    port: 8080,
    proxy: 8084,
    time: new Date(),
  };
};
