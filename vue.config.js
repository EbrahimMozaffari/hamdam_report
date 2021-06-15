module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    host: 'dashboard.hamdamapp.ir',
    port:443,
    https:true,
    disableHostCheck:true,
    proxy: {
      "/api/*" : {
        target:"https://stage.hamdamapi.ir",
        secure:true,
        changeOrigin:true
      }
    },
  },
};
