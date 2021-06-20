export const namespaced = true;

export const state = {
  reportData: null,
  overlay:false,
  totalmen: null,
  totalwomen: null,
  oldPercent: {men:0,women:0},
  newPercent: {men:0,women:0},
  currentNewDataName: null,
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

  getOverlay(state) {
    return state.overlay;
  },
  getAllDataModel(state) {
    return state.allDataModel;
  },
  getTotalMenWomen(state) {
    if(state.totalmen){
      return { totalmen: state.totalmen };
    }
      
  },


  getReportData(state) {
    return state.reportData;
  },
  getPercenData(state) {
      return { newPercent: state.newPercent, oldPercent: state.oldPercent };
  },
  getPercenDataName(state) {
    return { currentNewDataName:state.currentNewDataName };
},
};
export const mutations = {

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
  },
  SET_NEWPERCENT(state,payload){
    console.log("SET_NEWPERCENT", state.newPercent, state.oldPercent,payload);
   // state.oldPercent = {};
    Object.assign(state.oldPercent,state.newPercent);
    Object.assign(state.newPercent,payload);
    // state.oldPercent = state.newPercent;
    //state.newPercent = {};
    // state.newPercent = payload;
  },
  SET_CURRENT_DATANAME(state,payload){
    state.currentNewDataName = payload;
  },
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
            if(item == "null"){
              url += `${k}=&`;
            }else{
              url += `${k}=${item}&`;
            }
            
          });     
        }     
    });
    console.log("url",url)
      let data = await axios
        .get(`/api/Panel/v1/Reporting/?${url}`)
        // .get(`https://hamdamapi.ir/api/Panel/v1/Reporting/?${url}`)
        .then((response) => {
          console.log("SUCCESS!!", response.data);

          return response.data;
        })
        .catch(function (error) {
          console.log("FAILURE!!", error);
        });
      //console.log("dataaa", data);
      if (data) {
        commit("SET_TOTALMEN", data.data);
       // commit("SET_TOTALWOMEN", data.data);
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
        // if(payload.value.length){
        //   payload.value.forEach((item, index) => {
        //     if(item == "null"){
        //       url += `${payload.dataModelName}=&`;
        //     }else{
        //       url += `${payload.dataModelName}=${item}&`;
        //     }
            
        //   });     
        // }     
 
// var url = `/api/Panel/v1/Reporting/Factors/?${payload.dataModelName}=${payload.value}`;
// console.log('payload.dataModelName',payload.dataModelName)

      let data = await axios
        .get(`/api/Panel/v1/Reporting/Factors/?factor=${payload.dataModelName}`)
        // .get(`https://hamdamapi.ir/api/Panel/v1/Reporting/Factors/?factor=${payload.dataModelName}`)
        .then((response) => {
          console.log("SUCCESS!! single", response.data);

          return response.data;
        })
        .catch(function (error) {
          console.log("FAILURE!!", error);
        });
      //console.log("dataaa", data);
      if (data) {
        commit("SET_REPORT_DATA", {dataname:payload.dataModelName,value:data});
      }
    } catch (e) {
      console.log(e);
    }
  },
  async setNewPercent({ commit }, payload) {
  //  console.log("SET_NEWPERCENT");
  if(isNaN(payload.men)){
    commit("SET_NEWPERCENT", {men:0,women:0});
  }else{
    commit("SET_NEWPERCENT", payload);
  }
    
  },
  async setCurrentDataName({ commit }, payload) {
    // console.log("SET_CURRENT_DATANAME");
    commit("SET_CURRENT_DATANAME", payload);
  },
};
