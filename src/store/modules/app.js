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
        .get(`https://hamdamapi.ir/api/Panel/v1/Reporting/?${url}`)
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
        .get(`https://hamdamapi.ir/api/Panel/v1/Reporting/Factors/?factor=${payload.dataModelName}`)
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

};
