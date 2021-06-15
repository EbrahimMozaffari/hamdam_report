export const namespaced = true;

export const state = {
  hamdamData: {},
  reportData: null,
  overlay:false,
  totalmen: null,
  totalwomen: null,
  allDataModel: {
    SeminaryEducationLevel: null,
    TurbanWearingStatus: null,
    EducationStatus: null,
    EducationalStage: null,
    UniversityOrSchoolType: null,
    JobStatus: null,
    ContractType: null,
    SkinColor: null,
    EyeColor: null,
    BodyWeightCategory: null,
    ClothingType: null,
    ConscriptionStatus: null,
    HasSpecificDisease: null,
    HasDisability: null,
    SocioeconomicStatus: null,
    HomeOwnershipStatus: null,
    HasAPrivateHouse: null,
    IncomeLevel: null,
    WealthLevel: null,
    ReligiousPractice: null,
    ListeningToMusicStatus: null,
    LivingAbroadTendency: null,
    MaritalStatus: null,
    LivingTogetherDuration: null,
    Religion: null,
  },
};

export const getters = {
  getHamdamData(state) {
    return state.hamdamData;
  },
  getOverlay(state) {
    return state.overlay;
  },
  getAllDataModel(state) {
    return state.allDataModel;
  },
  getTotalMenWomen(state) {
    if(state.totalmen){
      return { totalmen: state.totalmen, totalwomen: state.totalwomen };
    }
    
  },
  getTotalCount(state) {
    return (
      state.hamdamData.maleReportCount.maleCount +
      state.hamdamData.feMaleReportCount.feMaleCount
    );
  },
  getMalePercent(state) {
    //console.log("getMalePercent",state.hamdamData.maleReportCount.maleCount + state.hamdamData.feMaleReportCount.feMaleCount)
    return (
      (state.hamdamData.maleReportCount.maleCount * 100) /
      (state.hamdamData.maleReportCount.maleCount +
        state.hamdamData.feMaleReportCount.feMaleCount)
    );
  },
  getFemalePercent(state) {
    return (
      (state.hamdamData.feMaleReportCount.feMaleCount * 100) /
      (state.hamdamData.maleReportCount.maleCount +
        state.hamdamData.feMaleReportCount.feMaleCount)
    );
  },
  getReportData(state) {
    return state.reportData;
  },
};
export const mutations = {
  
  SET_HAMDAM_DATA(state, payload) {
    state.hamdamData = payload;
  },
  SET_REPORT_DATA(state, payload) {
    state.allDataModel[payload.dataname] = payload.value;
  },
  SET_TOTALMEN(state, payload) {
    state.totalmen = payload;
  },
  SET_TOTALWOMEN(state, payload) {
    state.totalwomen = payload;
  },
  SET_OVERLAY(state,payload){
    state.overlay = payload;
  }
};

export const actions = {
  setOverlay({ commit,state }, payload) {
    //console.log('overlay',payload)
    commit("SET_OVERLAY",payload);

    
  },
  async sendDataReport({ commit }, payload) {
    try {
     // console.log("reportData",reportData);
      let url ="";

      Object.keys(payload).forEach(function(k){
        //console.log(k + ' - ' + payload[k]);
        if(payload[k].length){
          payload[k].forEach((item, index) => {
            url += `${k}=${item}&`;
          });     
        }     
    });
    console.log("url",url)
      let data = await axios
        //.get(`https://dev.hamdamapi.ir/api/Panel/v1/Reporting/?${url}`)
        .get(`/api/Panel/v1/Reporting/?${url}`)
        .then((response) => {
          console.log("SUCCESS!!", response.data);

          return response.data;
        })
        .catch(function (error) {
          console.log("FAILURE!!", error);
        });
      console.log("dataaa", data);
      if (data) {
        commit("SET_TOTALMEN", data.data);
        commit("SET_TOTALWOMEN", data.data);
      }
    } catch (e) {
      console.log(e);
    }
  },
  async sendSingleData({ commit }, payload) {
    try {
      // var reportData = payload;
      let url ="";

  
        //console.log(k + ' - ' + payload[k]);
        if(payload.value.length){
          payload.value.forEach((item, index) => {
            url += `${payload.dataModelName}=${item}&`;
          });     
        }     
 
// var url = `/api/Panel/v1/Reporting/Factors/?${payload.dataModelName}=${payload.value}`;
// console.log('payload.dataModelName',payload.dataModelName)

      let data = await axios
        //.get(`https://dev.hamdamapi.ir/api/Panel/v1/Reporting/Factors/?factor=${payload.dataModelName}`)
        .get(`/api/Panel/v1/Reporting/Factors/?factor=${payload.dataModelName}`)
        .then((response) => {
          console.log("SUCCESS!! single", response.data);

          return response.data;
        })
        .catch(function (error) {
          console.log("FAILURE!!", error);
        });
      console.log("dataaa", data);
      if (data) {
        commit("SET_REPORT_DATA", {dataname:payload.dataModelName,value:data});
      }
    } catch (e) {
      console.log(e);
    }
  },
  async fetchHamdamData({ commit }) {
    try {
      let data = await axios
        .get("/api/Panel/v1/Reporting", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6InRuZUNrU011WkdjR19zOURXU1lqaUEiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MjM1NzMxMzksImV4cCI6MTYyMzU3NjczOSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5pZGFsbC5wcm8iLCJhdWQiOiJoYW1kYW0tYXBpIiwiY2xpZW50X2lkIjoiaGFtZGFtLWFkbWluIiwic3ViIjoid201Zzc1eDMzdDd5ZmFqNmdtOHBjYzd2NHUiLCJhdXRoX3RpbWUiOjE2MjM0OTU2OTUsImlkcCI6ImxvY2FsIiwidXNlcm5hbWUiOiIwOTM1ODY3NTQ3OSIsImp0aSI6IkczRE1ib1ZhS1lCSHFBbzBoRUlCaVEiLCJzY29wZSI6WyJwaG9uZSIsInByb2ZpbGUiLCJvcGVuaWQiLCJoYW1kYW0tYXBpLmFkbWluIl0sImFtciI6WyJwd2QiXX0.hNdThPfuFdQ32YnDkvzPnf9GDm6MxM75HM_0o-g8cOoun2ZXYTzohSK7Zr5LHK5J0u6JGCXRApPtfLm60Cs7jA`,
          },
        })
        .then((response) => {
          console.log("SUCCESS!!", response.data.data);

          // return response.data.file.url;
          return response.data.data;
          //funcCreate(response.data.file.url);
        })
        .catch(function (error) {
          console.log("FAILURE!!", error);
        });
      console.log("dataaa", data);
      if (data) {
        commit("SET_HAMDAM_DATA", data);
      }
    } catch (e) {
      console.log(e);
    }
  },
};
