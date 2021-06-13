export const namespaced = true;

export const state = {
  hamdamData:{},
//    hamdamData: {
//     "male":{
//         "count":767,
//         "factors":[
//             {"HasSpecificDisease": [
//                 {"-1":35},
//                 {"0":710},
//                 {"1":22}
//             ]},
//             {"IncomeLevel":[
//                 {"1":16},
//                 {"2":5},
//                 {"3":17},
//                 {"4":136},
//                 {"5":330},
//                 {"6":162},
//                 {"7":35},
//                 {"8":19},
//                 {"9":40},
//                 {"10":7}
//             ]},
//             {
//                 "JobStatus":[
//                     {"0":36},
//                     {"1":31},
//                     {"2":40},
//                     {"3":655},
//                     {"4":5}
//                 ]
//             }
//         ]
//     },
//     "female":{
//         "count":1015,
//         "factors":[
//             {"HasSpecificDisease": [
//                 {"-1":54},
//                 {"0":936},
//                 {"1":25}
//             ]},
//             {"IncomeLevel":[
//                 {"1":275},
//                 {"2":65},
//                 {"3":114},
//                 {"4":235},
//                 {"5":206},
//                 {"6":52},
//                 {"7":9},
//                 {"8":3},
//                 {"9":55},
//                 {"10":1}
//             ]},
//             {
//                 "JobStatus":[
//                     {"0":21},
//                     {"1":247},
//                     {"2":58},
//                     {"3":648},
//                     {"4":41}
//                 ]
//             }
//         ]
//     }

// },

};

export const getters = {
  getHamdamData(state) {
    return state.hamdamData;
  },
  getTotalCount(state) {
  
    return state.hamdamData.maleReportCount.maleCount + state.hamdamData.feMaleReportCount.feMaleCount;
  },
  getMalePercent(state) {
    //console.log("getMalePercent",state.hamdamData.maleReportCount.maleCount + state.hamdamData.feMaleReportCount.feMaleCount)
    return (state.hamdamData.maleReportCount.maleCount*100)/(state.hamdamData.maleReportCount.maleCount + state.hamdamData.feMaleReportCount.feMaleCount);
  },
  getFemalePercent(state) {
    return (state.hamdamData.feMaleReportCount.feMaleCount*100)/(state.hamdamData.maleReportCount.maleCount + state.hamdamData.feMaleReportCount.feMaleCount);
  },

};
export const mutations = {
  SET_HAMDAM_DATA(state, payload) {
    state.hamdamData = payload;
  },

};

export const actions = {
  async fetchHamdamData({ commit }) {
    try {
      
      let data = await axios
        .get("/api/Panel/v1/Reporting", {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `bearer eyJhbGciOiJFUzI1NiIsImtpZCI6InRuZUNrU011WkdjR19zOURXU1lqaUEiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MjM1MDAyMDUsImV4cCI6MTYyMzUwMzgwNSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5pZGFsbC5wcm8iLCJhdWQiOiJoYW1kYW0tYXBpIiwiY2xpZW50X2lkIjoiaGFtZGFtLWFkbWluIiwic3ViIjoid201Zzc1eDMzdDd5ZmFqNmdtOHBjYzd2NHUiLCJhdXRoX3RpbWUiOjE2MjM0OTU2OTUsImlkcCI6ImxvY2FsIiwidXNlcm5hbWUiOiIwOTM1ODY3NTQ3OSIsImp0aSI6IkxWM2E2S2hDbDBEdGhLaVZVTUtpREEiLCJzY29wZSI6WyJwaG9uZSIsInByb2ZpbGUiLCJvcGVuaWQiLCJoYW1kYW0tYXBpLmFkbWluIl0sImFtciI6WyJwd2QiXX0.5INDR9q-MbET_P0F9QgN7hEGFpfo8N3alevGc90pX_XPg80pHugndOSc_AJbXl-XnKNS6O0ikyUWGFTLR1jL7w`
          }
        })
        .then((response) => {
          console.log("SUCCESS!!", response.data.data);

          // return response.data.file.url;
          return response.data.data;
          //funcCreate(response.data.file.url);
        })
        .catch(function(error) {
          console.log("FAILURE!!", error);
        });
console.log("dataaa",data)
      if (data) {
        commit("SET_HAMDAM_DATA", data);
      }
    } catch (e) {
      console.log(e);
    }
  },
};
