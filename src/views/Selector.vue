<template>
  <v-main class="backTexture">
    <v-overlay :absolute="absolute" :value="myoverlay"> </v-overlay>
    <div class="mypositon col-2 pl-0" dir="rtl">
      <v-card class="mx-auto pa-0">
        <v-app-bar dark color="indigo">
          <v-toolbar-title class="iranSansBold"> گزارش انتخابی</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-container class="px-0 selector scrolable">
          <p>
            <v-icon color="indigo">mdi-human-male </v-icon>

            <span v-if="totalMenWomen.men" class="iranSansBold boy">
              <span>{{ totalMenWomen.men }}</span>
              %
            </span>
            <span v-if="maleCount" class="iranSansBold boy mr-1">
              {{ maleCount }} نفر</span
            >
          </p>
          <p>
            <v-icon color="indigo">mdi-human-female</v-icon>
            <span v-if="totalMenWomen.women" class="iranSansBold girl">
              <span v-if="totalMenWomen.women">{{ totalMenWomen.women }}</span>
              %
            </span>
            <span v-if="femaleCount" class="iranSansBold girl mr-1">
              {{ femaleCount }} نفر</span
            >
          </p>
          <div>
            <!-- {{ allDataTitle }}  -->
            <div
              v-for="(item, index) in allDataTitle.title"
              class="iranSansLight fontSize15"
              :key="index"
            >
              <p class="light-blue lighten-4 pa-1 ma-0">{{ item }}</p>
              <!-- <p>{{item.subtitle}}</p> -->
              <div class="blue-grey lighten-5 pr-5">
                <div
                  class=""
                  v-for="myitem in allDataTitle.subtitle[index]"
                  :key="myitem"
                >
                  - {{ myitem }}
                </div>
              </div>
            </div>
          </div>
        </v-container>
      </v-card>
    </div>
    <v-row dir="rtl" class="d-flex flex-row pl-5 pb-5">
      <div class="mt-5 col-2 pa-0"></div>
      <v-card class="mt-5 col-10 pa-0">
        <v-app-bar dark color="indigo">
          <v-toolbar-title class="iranSansBold">
            داشبورد پیشرفته آمار و تحلیل اطلاعات
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <!-- <v-icon @click="$oidc.signOut()" color="red">mdi-exit-to-app</v-icon> -->
        </v-app-bar>
        <v-container class="px-0 selector">
          <table class="col-12">
            <SelectorComponent
              v-for="(item, index) in allData"
              :key="index"
              class="mt-5"
              :selectorData="item"
              :minusData="minusData"
              @over="setAllModelMethod"
            />
          </table>
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
    maleCount: null,
    femaleCount: null,
    allDataTitle: [],
    minusData: null,
    allData: {
      SeminaryEducationLevelData: {
        dataModelName: "SeminaryEducationLevel",
        title: "سطح تحصیلات حوزوی",
        names: [
          "ثبت نشده",
          "ندارد",
          "مقدمات",
          "سطح یک",
          "سطح دو",
          "سطح سه",
          "سطح چهار",
          "خارج",
        ],
        values: ["null", "1", "2", "3", "4", "5", "6", "7"],
        icons: [
          "mdi-alert-circle",
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
        names: [
          "ثبت نشده",
          "معمم نیستم و قصد آن را ندارم",
          "معمم هستم یا خواهم شد",
        ],
        values: ["null", "1", "2"],
        icons: [
          "mdi-alert-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
        ],
      },
      EducationStatusData: {
        dataModelName: "EducationStatus",
        title: "وضعیت تحصیلی",
        names: ["ثبت نشده", "در حال تحصیل", "فارق التحصیل"],
        values: ["null", "1", "2"],
        icons: [
           "mdi-alert-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
        ],
      },
      EducationalStageData: {
        dataModelName: "EducationalStage",
        title: "میزان تحصیلات",
        names: [
          "ثبت نشده ",
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
        values: [
          "null",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
        ],
        icons: [
          "mdi-alert-circle",
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
          "ثبت نشده",
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
        values: [
          "null",
          "1",
          "2",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "100",
        ],
        icons: [
          "mdi-alert-circle",
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
        names: ["ثبت نشده ", "بیکار", "خانه دار", "شاغل", "بازنشسته"],
        values: ["null", "1", "2", "3", "4"],
        icons: [
          "mdi-alert-circle",
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
          "ثبت نشده",
          "رسمی",
          "قراردادی",
          "پیمانی",
          "آزمایشی",
          "نیمه وقت",
          "پروژه ای",
          "سایر",
        ],
        values: ["null", "1", "2", "3", "4", "5", "6", "100"],
        icons: [
          "mdi-alert-circle",
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
        names: ["ثبت نشده", "سفید", "گندمی", "سبزه", "سبزه تیره"],
        values: ["null", "1", "2", "3", "4"],
        icons: [
          "mdi-alert-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
        ],
      },
      EyeColorData: {
        dataModelName: "EyeColor",
        title: "رنگ چشم",
        names: [
          "ثبت نشده",
          "قهوه ای",
          "مشکلی",
          "آبی",
          "سبز",
          "خاکستری",
          "عسلی",
        ],
        values: ["null", "1", "2", "3", "4", "5", "6"],
        icons: [
          "mdi-alert-circle",
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
        names: ["ثبت نشده ", "خیلی لاغر", "لاغر", "متناسب", "چاق", "خیلی چاق"],
        values: ["null", "1", "2", "3", "4", "5"],
        icons: [
          "mdi-alert-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
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
        values: ["null", "1", "2", "3", "4", "5", "6", "7", "8", "100"],
        icons: [
          "mdi-alert-circle",
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
          "ثبت نشده",
          "مشمول هستم",
          "مشمول هستم و قصد خدمت ندارم",
          "مشمول نیستم",
          "در حال خدمت",
          "معافیت تحصیلی",
          "معافیت دائم",
          "پایان خدمت",
        ],
        values: ["null", "1", "2", "3", "4", "5", "6", "7"],
        icons: [
          "mdi-alert-circle",
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
        names: ["ثبت نشده", "دارد", "ندارد"],
        values: ["-1", "1", "0"],
        icons: ["mdi-alert-circle", "mdi-check-circle", "mdi-close-circle"],
      },
      HasDisabilityData: {
        dataModelName: "HasDisability",
        title: "دارای معلولیت",
         names: ["ثبت نشده", "دارد", "ندارد"],
        values: ["-1", "1", "0"],
        icons: ["mdi-alert-circle", "mdi-check-circle", "mdi-close-circle"],
      },
      SocioeconomicStatusData: {
        dataModelName: "SocioeconomicStatus",
        title: "وضعیت اقتصادی",
        names: ["ثبت نشده", "پایین", "متوسط", "بالا", "خیلی بالا"],
        values: ["null", "1", "2", "3", "4"],
        icons: [
         "mdi-alert-circle",
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
          "ثبت نشده",
          "خانه شخصی",
          "آپارتمان شخصی",
          "خانه استیجاری",
          "آپارتمان استیجاری",
          "خانه سازمانی",
          "سایر",
        ],
        values: ["null", "1", "2", "3", "4", "5", "100"],
        icons: [
         "mdi-alert-circle",
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
         names: ["ثبت نشده", "دارد", "ندارد"],
        values: ["-1", "1", "0"],
        icons: ["mdi-alert-circle", "mdi-check-circle", "mdi-close-circle"],
      },
      IncomeLevelData: {
        dataModelName: "IncomeLevel",
        title: "سطح درآمد",
        names: [
          "ثبت نشده",
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
        values: ["null", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        icons: [
         "mdi-alert-circle",
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
          "ثبت نشده",
          "در حال حاظر دارایی قابل ارائه ای ندارم",
          "صفر تا ده میلیون تومان",
          "بیش از ده میلیون تا پنجاه میلیون تومان",
          "بیش از پنجاه میلیون تا دویست میلیون تومان",
          "بیش از دویست میلیون تا پانصد میلیون تومان",
          "بیش از پانصد میلیون تا یک میلیارد تومان",
          "بیش از یک میلیارد تا پنج میلیارد تومان",
          "بیش از پنج میلیارد تومان",
        ],
        values: ["null", "1", "2", "3", "4", "5", "6", "7", "8"],
        icons: [
          "mdi-alert-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
          "mdi-numeric-6-circle",
          "mdi-numeric-7-circle",
          "mdi-numeric-8-circle",
        ],
      },
      ReligiousPracticeData: {
        dataModelName: "ReligiousPractice",
        title: "تقید مذهبی",
        names: [
          "ثبت نشده",
          "بسیار مقید",
          "مقید و متعادل",
          "اکتفا به واجبات",
          "انجام پاره ای از واجبات",
          "چندان پایبند نیستم",
        ],
        values: ["null", "1", "2", "3", "4", "5"],
        icons: [
         "mdi-alert-circle",
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
          "ثبت نشده",
          "کاملا هست",
          "به هیچ عنوان نیست",
          "ممکن است گوش کند",
        ],
        values: ["null", "1", "2", "3"],
        icons: [
         "mdi-alert-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
        ],
      },
      LivingAbroadTendencyData: {
        dataModelName: "LivingAbroadTendency",
        title: "تمایل به زندگی خارج از کشور",
        names: [
          "ثبت نشده",
          "کاملا متمایل هست",
          "به هیچ عنوان تمایل ندارد",
          "زندگی در ایران و خارج از ایران تفاوت ندارد",
        ],
        values: ["null", "1", "2", "3"],
        icons: [
          "mdi-alert-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
        ],
      },
      MaritalStatusData: {
        dataModelName: "MaritalStatus",
        title: "وضعیت تأهل",
        names: [
          "ثبت نشده",
          "مجرد",
          "نامزدی ناموفق",
          "طلاق گرفته",
          "همسر فوت شده",
        ],
        values: ["null", "1", "2", "3", "4"],
        icons: [
         "mdi-alert-circle",
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
          "ثبت نشده ",
          "کمتر از یک سال",
          "بیش از یک سال الی سه سال",
          "بیش از سه سال",
        ],
        values: ["null", "1", "2", "3"],
        icons: [
          "mdi-alert-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
        ],
      },
      ReligionData: {
        dataModelName: "Religion",
        title: "دین/مذهب",
        names: ["ثبت نشده","شیعه", "سنی", "مسیحی", "کلیمی", "زرتشتی", "سایر"],
        values: ["null","1", "2", "3", "4", "5", "100"],
        icons: [
          "mdi-alert-circle",
          "mdi-numeric-1-circle",
          "mdi-numeric-2-circle",
          "mdi-numeric-3-circle",
          "mdi-numeric-4-circle",
          "mdi-numeric-5-circle",
          "mdi-numeric-6-circle",
        ],
      },
      //////////////////////////////////////////////////////#############################################
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
      this.setTitle();
      this.setPercentDataName(value.dataModelName);
      // debounce( ()=> {
      //     console.log("debounce");
      //     mysend()
      //   }, 300);
      //   function mysend(){
      //     console.log(" this.allDataModel", this.allDataModel);
      //   }
    },
    sendData() {
      this.$store.dispatch("app/sendDataReport", this.allDataModel);
    },
    setTitle() {
      let allDataModel = this.allDataModel;
      let title = this.allDataTitle;
      let allData = this.allData;
      let count = 0;
      let subtitle = [];
      title = [];
      Object.keys(allDataModel).forEach(function (k) {
        if (allDataModel[k].length) {
          //console.log(k + " - " + allDataModel[k]);
          title[count] = allData[`${k}Data`]["title"];
          let subTemp = [];
          allDataModel[k].forEach((element) => {
            let index = null;

            index = allData[`${k}Data`]["values"].findIndex(
              (values) => values == element
            );
            subTemp.push(allData[`${k}Data`]["names"][index]);
            //subtitle[count].push(allData[`${k}Data`]["names"][index]);
            //console.log("valuesTitle", allData[`${k}Data`]["names"][index]);
            //title[count].children.push(allData[`${k}Data`]["names"][index])
          });
          subtitle[count] = subTemp;
          console.log("subTemp", subTemp);
          count++;
        }
      });
      // this.allDataModel.forEach(element => {

      this.allDataTitle = {
        title: title,
        subtitle: subtitle,
      };
    },
    setPercentDataName(dataName) {
      console.log("setPercentDataName",dataName);
      this.$store.dispatch("app/setCurrentDataName", dataName);
    },
  },
  mounted() {

  },
  computed: {

    totalMenWomen() {
      let data = this.$store.getters["app/getTotalMenWomen"];
      let womenPercent = 0;
      let menPercent = 0;
      // console.log("---> data:",data)
      if (data) {
        menPercent =
          Math.round(
            ((data.totalmen.maleCount * 100) / data.totalmen.totalCount) * 100
          ) / 100;
        womenPercent =
          Math.round(
            ((data.totalmen.feMaleCount * 100) / data.totalmen.totalCount) * 100
          ) / 100;
        this.maleCount = data.totalmen.maleCount;
        this.femaleCount = data.totalmen.feMaleCount;
        this.$store.dispatch("app/setNewPercent", {
          men: menPercent,
          women: womenPercent,
        });
      }

      return { men: menPercent, women: womenPercent };
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
      //console.log("allDataModel", this.allDataModel);
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
  font-size: 15px;
}

.selector .percent {
  line-height: 2;
  margin-right: 10px;
}
.mypositon {
  top: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
}
// .scrolable{

// }
.reportTitle {
  background: #bbffda;
  padding: 3px;
}
.fontSize15 {
  font-size: 15px;
}
@media screen and (max-width: 991px) {
  .mypositon {
    top: 0;
    right: 0;
  }
}
//  @import '~pretty-checkbox/src/pretty-checkbox.scss';
</style>
