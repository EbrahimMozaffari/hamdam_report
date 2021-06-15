<template>
  <v-main class="backTexture">
    <v-overlay :absolute="absolute" :value="myoverlay"> </v-overlay>
    <div class="mypositon col-2">
      <v-card class="mx-auto mt-5 pa-0">
        <v-app-bar dark color="indigo">
          <v-toolbar-title class="iranSansBold"> گزارش انتخابی</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-container class="px-5 selector">
          <p>
            <v-icon color="indigo">mdi-human-male </v-icon>

            <span  v-if="totalMenWomen.men">
              <span>{{totalMenWomen.men}}</span>
              %
            </span>
          </p>
          <p>
            <v-icon color="indigo">mdi-human-female</v-icon>
            <span v-if="totalMenWomen.women">
              <span v-if="totalMenWomen.women">{{totalMenWomen.women}}</span>
              %
            </span>
          </p>
        </v-container>
      </v-card>
    </div>
    <v-row dir="rtl" class="d-flex flex-row">
      <v-card class="mx-auto mt-5 col-6 pa-0">
        <v-app-bar dark color="indigo">
          <v-toolbar-title class="iranSansBold"> گزارش گیری</v-toolbar-title>

          <v-spacer></v-spacer>
          <!-- <v-icon @click="$oidc.signOut()" color="red">mdi-exit-to-app</v-icon> -->
        </v-app-bar>
        <v-container class="px-5 selector">
          <SelectorComponent
            v-for="(item, index) in allData"
            :key="index"
            class="mt-5"
            :selectorData="item"
            @over="setAllModelMethod"
          />
        </v-container>
      </v-card>
    </v-row>
  </v-main>
</template>

<script>
import SelectorComponent from "@/views/SelectorComponent.vue";
import mainAuth from "../plugins/auth";
export default {
  name: "Selector",
  data: () => ({
    val: false,
    absolute: false,
    overlay: true,
    menPercent: null,
    womenPercent: null,
    allData: {
      SeminaryEducationLevelData: {
        dataModelName: "SeminaryEducationLevel",
        title: "سطح تحصیلات حوزوی",
        names: [
          "ندارد",
          "مقدمات",
          "سطح یک",
          "سطح دو",
          "سطح سه",
          "سطح چهار",
          "خارج",
        ],
        values: ["1", "2", "3", "4", "5", "6", "7"],
        icons: [
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
          "mdi-numeric-6-circle",
          "mdi-numeric-7-circle",
        ],
      },
      TurbanWearingStatusData: {
        dataModelName: "TurbanWearingStatus",
        title: "وضعیت معمم بودن",
        names: ["معمم نیستم و قصد آن را ندارم", "معمم هستم یا خواهم شد"],
        values: ["1", "2"],
        icons: ["mdi-numeric-1-circle", "mdi-numeric-2-circle"],
      },
      EducationStatusData: {
        dataModelName: "EducationStatus",
        title: "وضعیت تحصیلی",
        names: ["در حال تحصیل", "فارق التحصیل"],
        values: ["1", "2"],
        icons: ["mdi-numeric-1-circle", "mdi-numeric-2-circle"],
      },
      EducationalStageData: {
        dataModelName: "EducationalStage",
        title: "میزان تحصیلات",
        names: [
          "اهمیتی ندارد",
          "ابتدایی",
          "راهنمایی",
          "دبیرستان",
          "دیپلم ردی",
          "دیپلم",
          "پیش دانشگاهی",
          "کاردانی",
          "کارشناسی",
          "کارشناسی ارشد",
          "دکتری",
          "فوق دکتری",
        ],
        values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
        icons: [
          "mdi-minus-circle",
          "mdi-numeric-0-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
          "mdi-numeric-6-circle",
          "mdi-numeric-7-circle",
          "mdi-numeric-8-circle",
          "mdi-numeric-9-circle",
          "mdi-numeric-10-circle",
        ],
      },
      UniversityOrSchoolTypeData: {
        dataModelName: "UniversityOrSchoolType",
        title: "نوع دانشگاه یا آموزشگاه",
        names: [
          "مدرسه دولتی",
          "مدرسه خصوصی",
          "دانشگاه دولتی",
          "دانشگاه آزاد",
          "دانشگاه پیام نور",
          "دانشگاه غیر انتفاعی",
          "دانشگاه علمی کاربردی",
          "دانشگاه مجازی",
          "دانشگاه فرهنگیان",
          "سایر",
        ],
        values: ["1", "2", "10", "11", "12", "13", "14", "15", "16", "100"],
        icons: [
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
          "mdi-numeric-6-circle",
          "mdi-numeric-7-circle",
          "mdi-numeric-8-circle",
          "mdi-numeric-9-circle",
          "mdi-numeric-10-circle",
        ],
      },
      JobStatusData: {
        dataModelName: "JobStatus",
        title: "وضعیت شغلی",
        names: ["اهمیتی ندارد", "بیکار", "خانه دار", "شاغل", "بازنشسته"],
        values: ["0", "1", "2", "3", "4"],
        icons: [
          "mdi-minus-circle",
          "mdi-close-circle",
          "mdi-home-circle",
          "mdi-account-hard-hat",
          "mdi-hiking",
        ],
      },
      ContractTypeData: {
        dataModelName: "ContractType",
        title: "نوع قرارداد",
        names: [
          "وارد نشده",
          "رسمی",
          "قراردادی",
          "پیمانی",
          "آزمایشی",
          "نیمه وقت",
          "پروژه ای",
          "سایر",
        ],
        values: ["0", "1", "2", "3", "4", "5", "6", "100"],
        icons: [
          "mdi-numeric-0-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
          "mdi-numeric-6-circle",
          "mdi-numeric-7-circle",
        ],
      },
      SkinColorData: {
        dataModelName: "SkinColor",
        title: "رنگ پوست",
        names: ["وارد نشده", "سفید", "گندمی", "سبزه", "سبزه تیره"],
        values: ["0", "1", "2", "3", "4"],
        icons: [
          "mdi-numeric-0-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
        ],
      },
      EyeColorData: {
        dataModelName: "EyeColor",
        title: "رنگ پوست",
        names: [
          "وارد نشده",
          "قهوه ای",
          "مشکلی",
          "آبی",
          "سبز",
          "خاکستری",
          "عسلی",
        ],
        values: ["0", "1", "2", "3", "4", "5", "6"],
        icons: [
          "mdi-numeric-0-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
          "mdi-numeric-6-circle",
        ],
      },
      BodyWeightCategoryData: {
        dataModelName: "BodyWeightCategory",
        title: "تناسب اندام",
        names: [
          "اهمیتی ندارد",
          "خیلی لاغر",
          "لاغر",
          "متناسب",
          "چاق",
          "خیلی چاق",
        ],
        values: ["0", "1", "2", "3", "4", "5"],
        icons: [
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
          "mdi-numeric-6-circle",
        ],
      },

      ClothingTypeData: {
        dataModelName: "ClothingType",
        title: "نوع پوشش",
        names: [
          "وارد نشده",
          "چادر",
          "مانتو محجبه",
          "مانتو",
          "معمم",
          "کت و شلوار",
          "اسپورت",
          "معمولی (رسمی)",
          "محلی",
          "سایر",
        ],
        values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "100"],
        icons: [
          "mdi-numeric-0-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
          "mdi-numeric-6-circle",
          "mdi-numeric-7-circle",
          "mdi-numeric-8-circle",
          "mdi-numeric-9-circle",
        ],
      },
      ConscriptionStatusData: {
        dataModelName: "ConscriptionStatus",
        title: "وضعیت نظام وظیفه",
        names: [
          "مشمول هستم",
          "مشمول هستم و قصد خدمت ندارم",
          "مشمول نیستم",
          "در حال خدمت",
          "معافیت تحصیلی",
          "معافیت دائم",
          "پایان خدمت",
        ],
        values: ["1", "2", "3", "4", "5", "6", "7"],
        icons: [
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
          "mdi-numeric-6-circle",
          "mdi-numeric-7-circle",
        ],
      },
      HasSpecificDiseaseData: {
        dataModelName: "HasSpecificDisease",
        title: "بیماری خاص",
        names: ["دارد", "ندارد", "ثبت نشده"],
        values: ["1", "-1", "0"],
        icons: ["mdi-check-circle", "mdi-close-circle", "mdi-minus-circle"],
      },
      HasDisabilityData: {
        dataModelName: "HasDisability",
        title: "دارای معلولیت",
        names: ["دارد", "ندارد", "وارد نشده"],
        values: ["1", "-1", "0"],
        icons: ["mdi-check-circle", "mdi-close-circle", "mdi-minus-circle"],
      },
      SocioeconomicStatusData: {
        dataModelName: "SocioeconomicStatus",
        title: "وضعیت اقتصادی",
        names: ["وارد نشده", "پایین", "متوسط", "بالا", "خیلی بالا"],
        values: ["0", "1", "2", "3", "4"],
        icons: [
          "mdi-numeric-0-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
        ],
      },
      HomeOwnershipStatusData: {
        dataModelName: "HomeOwnershipStatus",
        title: "وضعیت محل سکونت",
        names: [
          "وارد نشده",
          "خانه شخصی",
          "آپارتمان شخصی",
          "خانه استیجاری",
          "آپارتمان استیجاری",
          "خانه سازمانی",
          "سایر",
        ],
        values: ["0", "1", "2", "3", "4", "5", "100"],
        icons: [
          "mdi-numeric-0-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
          "mdi-numeric-6-circle",
        ],
      },
      HasAPrivateHouseData: {
        dataModelName: "HasAPrivateHouse",
        title: "منزل شخصی",
        names: ["دارد", "ندارد", "وارد نشده"],
        values: ["1", "-1", "0"],
        icons: ["mdi-check-circle", "mdi-close-circle", "mdi-minus-circle"],
      },
      IncomeLevelData: {
        dataModelName: "IncomeLevel",
        title: "سطح درآمد",
        names: [
          "وارد نشده",
          "در حال حاظر درآمدی ندارم",
          "کمتر از یک میلیون تومان",
          "بیش از یک میلیون تا دو میلیون تومان",
          "بیش از دو میلیون تا چهار میلیون تومان",
          "بیش از چهار میلیون تا هشت میلیون تومان",
          "بیش از هشت میلیون تا دوازده میلیون تومان",
          "بیش از دوازده میلیون تا شانزده میلیون تومان",
          "بیش از شانزده میلیون تا بیست و پنج میلیون تومان",
          "بیش از بیست و پنج میلیون تا پنجاه میلیون تومان",
          "بیش از پنجاه میلیون تومان",
        ],
        values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        icons: [
          "mdi-numeric-0-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
          "mdi-numeric-6-circle",
          "mdi-numeric-7-circle",
          "mdi-numeric-8-circle",
          "mdi-numeric-9-circle",
          "mdi-numeric-10-circle",
        ],
      },
      WealthLevelData: {
        dataModelName: "WealthLevel",
        title: "پس انداز",
        names: [
          "وارد نشده",
          "در حال حاظر دارایی قابل ارائه ای ندارم",
          "صفر تا ده میلیون تومان",
          "بیش از ده میلیون تا پنجاه میلیون تومان",
          "بیش از پنجاه میلیون تا دویست میلیون تومان",
          "بیش از دویست میلیون تا پانصد میلیون تومان",
          "بیش از پانصد میلیون تا یک میلیارد تومان",
          "بیش از یک میلیارد تا پنج میلیارد تومان",
          "بیش از پنج میلیارد تومان",
        ],
        values: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
        icons: [
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
          "mdi-numeric-6-circle",
          "mdi-numeric-7-circle",
          "mdi-numeric-8-circle",
          "mdi-numeric-9-circle",
          "mdi-numeric-10-circle",
        ],
      },
      ReligiousPracticeData: {
        dataModelName: "ReligiousPractice",
        title: "تقید مذهبی",
        names: [
          "وارد نشده",
          "بسیار مقید",
          "مقید و متعادل",
          "اکتفا به واجبات",
          "انجام پاره ای از واجبات",
          "چندان پایبند نیستم",
        ],
        values: ["0", "1", "2", "3", "4", "5"],
        icons: [
          "mdi-numeric-0-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
        ],
      },
      ListeningToMusicStatusData: {
        dataModelName: "ListeningToMusicStatus",
        title: "اهل گوش دادنبه موسیقی",
        names: [
          "وارد نشده",
          "کاملا هست",
          "به هیچ عنوان نیست",
          "ممکن است گوش کند",
        ],
        values: ["0", "1", "2", "3"],
        icons: [
          "mdi-numeric-0-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
        ],
      },
      LivingAbroadTendencyData: {
        dataModelName: "LivingAbroadTendency",
        title: "تمایل به زندگی خارج از کشور",
        names: [
          "وارد نشده",
          "کاملا متمایل هست",
          "به هیچ عنوان تمایل ندارد",
          "زندگی در ایران و خارج از ایران تفاوت ندارد",
        ],
        values: ["0", "1", "2", "3"],
        icons: [
          "mdi-numeric-0-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
        ],
      },
      MaritalStatusData: {
        dataModelName: "MaritalStatus",
        title: "وضعیت تأهل",
        names: [
          "وارد نشده",
          "مجرد",
          "نامزدی ناموفق",
          "طلاق گرفته",
          "همسر فوت شده",
        ],
        values: ["0", "1", "2", "3"],
        icons: [
          "mdi-numeric-0-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
        ],
      },
      LivingTogetherDurationData: {
        dataModelName: "LivingTogetherDuration",
        title: "مدت زمان زندگی مشترک",
        names: [
          "اهمیتی ندارد",
          "کمتر از یک سال",
          "بیش از یک سال الی سه سال",
          "بیش از سه سال",
        ],
        values: ["0", "1", "2", "3"],
        icons: [
          "mdi-numeric-0-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
        ],
      },
      ReligionData: {
        dataModelName: "Religion",
        title: "دین/مذهب",
        names: ["شیعه", "سنی", "مسیحی", "کلیمی", "زرتشتی", "سایر"],
        values: ["1", "2", "3", "4", "5", "100"],
        icons: [
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
          "mdi-numeric-6-circle",
        ],
        Valueh: [
          "Shia",
          "Sunni",
          "Christian",
          "Jewish",
          "Zoroastrian",
          "Other",
        ],
      },
      //////////////////////////////////////////////////////#############################################

      // JobStatusData: {
      //   dataModelName: "JobStatus",
      //   title: "",
      //   names: [],
      //   values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      //   icons: [

      //   ],
      // },
    },
    allDataModel: {
      SeminaryEducationLevel: [],
      TurbanWearingStatus: [],
      EducationStatus: [],
      EducationalStage: [],
      UniversityOrSchoolType: [],
      JobStatus: [],
      ContractType: [],
      SkinColor: [],
      EyeColor: [],
      BodyWeightCategory: [],
      ClothingType: [],
      ConscriptionStatus: [],
      HasSpecificDisease: [],
      HasDisability: [],
      SocioeconomicStatus: [],
      HomeOwnershipStatus: [],
      HasAPrivateHouse: [],
      IncomeLevel: [],
      WealthLevel: [],
      ReligiousPractice: [],
      ListeningToMusicStatus: [],
      LivingAbroadTendency: [],
      MaritalStatus: [],
      LivingTogetherDuration: [],
      Religion: [],
    },

    ///////////////////////////////////////////////////-----------------------------------------
  }),
  methods: {
    setAllModelMethod(value) {
      // console.log("dataReceived", value);
      this.allDataModel[value.dataModelName] = value.value;
      this.sendData();
      // debounce( ()=> {
      //     console.log("debounce");
      //     mysend()
      //   }, 300);
      //   function mysend(){
      //     console.log(" this.allDataModel", this.allDataModel);
      //   }
    },
    sendData() {
      console.log(" this.allDataModel", this.allDataModel);
      //dispatch sendData
      this.$store.dispatch("app/sendDataReport", this.allDataModel);
    },
  },
  mounted() {
    // HAD TO ADD THIS CODE FOR IT TO WORK
    //let data = this.$store.state.app.hamdamData;
    //console.log("HamdamData", data.male);
    //this.$store.dispatch("app/fetchHamdamData");
    // if (data.length == 0) {
    //   this.$store.dispatch("app/fetchHamdamData");
    // }
  },
  computed: {
    hamdamData() {
      let data = this.$store.getters["app/getHamdamData"];
      console.log("data", data);
      return data;
    },
    totalMenWomen() {
      let data = this.$store.getters["app/getTotalMenWomen"];
      let womenPercent=0;
      let menPercent=0 ;
      if(data){
         menPercent =
        Math.round(
          ((data.totalmen.maleCount * 100) /
            data.totalmen.totalFullCount) *
            100
        ) / 100;
       womenPercent =
        Math.round(
          ((data.totalmen.feMaleCount * 100) /
            data.totalmen.totalFullCount) *
            100
        ) / 100;
      }
      
      return { men: menPercent,women:womenPercent };
      // if (data != undefined) {
      //   console.log('getter',data)
      //   if (data.data != undefined) {
      //     return data;
      //   }
      // }
    },
    myoverlay() {
      return this.$store.getters["app/getOverlay"];
    },
  },
  watch: {
    allDataModel: function () {
      console.log("allDataModel", this.allDataModel);
    },
  },
  components: {
    SelectorComponent,
  },
};
</script>

<style lang="scss">
.backTexture {
  // overflow: hidden;
  // padding: 20px 25px;
  // padding-top: 25px;
  // background: #F5F5F5;
  background: #f5f5f5 url(/img/bg1.png);
  // border-top:none;
}

.toolTipIcon {
  list-style-type: none;
}
.toolTipIcon li {
  font-family: IRANSansWeb-FaNum-Bold !important;
}
.selector label {
  cursor: pointer;
}
.selector .percent {
  line-height: 2;
  margin-right: 10px;
}
.mypositon {
  position: fixed;
  top: 15px;
  right: 15px;
}
@media screen and (max-width: 991px) {
  .mypositon {
    position: fixed;
    top: 5px;
    right: 5px;
  }
}
//  @import '~pretty-checkbox/src/pretty-checkbox.scss';
</style>
