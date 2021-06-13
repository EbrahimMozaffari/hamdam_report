module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api/*" : {
        target:"https://dev.hamdamapi.ir",
        secure:true,
        changeOrigin:true
      }
    },
  },
};
