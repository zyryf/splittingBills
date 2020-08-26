module.exports = {
  "outputDir": "C:\\Users\\jmmar\\Desktop\\Projekty\\splittingBills\\server\\public",
  "devServer": {
    "proxy": {
      "/api": {
        "target": "http://localhost:5000/"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}