import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  Gamepad2,
  Camera,
  Leaf,
  RotateCcw,
  Share2,
  Compass,
  DoorOpen,
  Footprints,
  CheckCircle2,
  CalendarDays,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  NotebookPen,
  Check,
  Volume2,
  VolumeX,
  HeartHandshake,
  ExternalLink,
  Clock,
} from "lucide-react";

// ---------- 字體：jf open 粉圓 Huninn（SIL OFL 1.1，可自由嵌入網頁） ----------
// 只收錄本頁用到的字所在的分片（含最常用的中文字），離線也能顯示圓體；
// 其餘字元連網時由 Google Fonts 的 Huninn 補上，再不行就退回系統字型。
import huninn0 from "./assets/fonts/huninn-32-400-normal.woff2";
import huninn1 from "./assets/fonts/huninn-57-400-normal.woff2";
import huninn2 from "./assets/fonts/huninn-73-400-normal.woff2";
import huninn3 from "./assets/fonts/huninn-84-400-normal.woff2";
import huninn4 from "./assets/fonts/huninn-104-400-normal.woff2";
import huninn5 from "./assets/fonts/huninn-105-400-normal.woff2";
import huninn6 from "./assets/fonts/huninn-106-400-normal.woff2";
import huninn7 from "./assets/fonts/huninn-107-400-normal.woff2";
import huninn8 from "./assets/fonts/huninn-108-400-normal.woff2";
import huninn9 from "./assets/fonts/huninn-109-400-normal.woff2";
import huninn10 from "./assets/fonts/huninn-110-400-normal.woff2";
import huninn11 from "./assets/fonts/huninn-111-400-normal.woff2";
import huninn12 from "./assets/fonts/huninn-112-400-normal.woff2";
import huninn13 from "./assets/fonts/huninn-113-400-normal.woff2";
import huninn14 from "./assets/fonts/huninn-114-400-normal.woff2";
import huninn15 from "./assets/fonts/huninn-115-400-normal.woff2";
import huninn16 from "./assets/fonts/huninn-116-400-normal.woff2";
import huninn17 from "./assets/fonts/huninn-117-400-normal.woff2";
import huninn18 from "./assets/fonts/huninn-118-400-normal.woff2";
import huninn19 from "./assets/fonts/huninn-119-400-normal.woff2";
import huninn20 from "./assets/fonts/huninn-120-400-normal.woff2";
import huninn21 from "./assets/fonts/huninn-121-400-normal.woff2";
import huninn22 from "./assets/fonts/huninn-122-400-normal.woff2";
import huninn23 from "./assets/fonts/huninn-123-400-normal.woff2";
const HUNINN_FACES = [
  [huninn0, "U+930b,U+930f,U+9312,U+9315,U+9319-931b,U+931d-931f,U+9321,U+9323-9325,U+9327-932a,U+932c-932e,U+9331-9333,U+9335,U+9338,U+933c,U+9340-9341,U+9345-9349,U+934f-9352,U+9354,U+9356-935a,U+935c-9360,U+9363-9367,U+9369-936a,U+936c,U+936e,U+9370-9371,U+9373,U+9376,U+9379-937a,U+937c,U+9385,U+9387,U+938c,U+938f,U+9394,U+9397-9398,U+939a-939b,U+939d-939e,U+93a1-93a3,U+93a6-93a7,U+93a9-93aa,U+93ac-93ad,U+93af-93b0,U+93b3-93bb,U+93bd-93be,U+93c0-93c4,U+93c7,U+93ca-93cd,U+93d0-93d1,U+93d6-93d8,U+93dc-93de,U+93e0,U+93e4,U+93e8,U+93ee,U+93f0,U+93f5,U+93f7-93f9,U+93fb,U+9403,U+9407,U+940f-9410,U+9413-9414,U+9417,U+9419"],
  [huninn1, "U+73b4-73ba,U+73bc,U+73bf,U+73c2,U+73c4-73c6,U+73c9,U+73cb-73cc,U+73ce-73d2,U+73d6-73d7,U+73d9,U+73db-73de,U+73e3,U+73e5-73eb,U+73ef,U+73f5-73f7,U+73f9-73fa,U+73fc-73fd,U+7400-7401,U+7404-7405,U+7407-7408,U+740a-740d,U+740f-7410,U+7416,U+741a-741b,U+741d-741e,U+7420-7425,U+7428-7429,U+742c-7432,U+7435-7436,U+7438-743a,U+743c-7442,U+7445-7446,U+7448-744a,U+7451-7452,U+7454,U+7457,U+7459,U+745d,U+7460-7462,U+7465,U+7467-7468,U+746c-746e,U+7471-7477,U+7479-747a,U+747c-747f,U+7481-7482,U+7484-7486,U+7488-748a,U+748e-7490,U+7492,U+7498,U+749a"],
  [huninn2, "U+60b0-60b1,U+60b3-60b5,U+60b8,U+60bb,U+60bd-60be,U+60c0,U+60c6-60c7,U+60ca-60cb,U+60d3-60d5,U+60d7-60db,U+60dd,U+60e2-60e3,U+60e6-60f0,U+60f2,U+60f4,U+60f6,U+60fa-60fb,U+60ff-6100,U+6103,U+6106,U+610a-610b,U+610d-610e,U+6110,U+6112-6116,U+6120,U+6123-6124,U+6128-6130,U+6134,U+6136,U+613c-613f,U+6144,U+6146-6147,U+6149-614a,U+614d,U+6151-6153,U+6159-615a,U+615c-615f,U+6164-6165,U+6169-616d,U+616f,U+6171-6175,U+6177,U+617a,U+617c,U+617f-6180,U+6187,U+618a-618e,U+6192-6194,U+6199-619b,U+619f,U+61a1,U+61a7-61a8,U+61aa-61af,U+61b8,U+61ba,U+61bf,U+61c3,U+61c6,U+61ca-61cb"],
  [huninn3, "U+52eb,U+52ed-52ee,U+52f0-52f2,U+52f7,U+52f9-52fa,U+5300-5302,U+530a-530b,U+530d,U+530f-5310,U+5315,U+531a,U+531c-531d,U+532d-532e,U+5331,U+5338,U+533b-533e,U+5344-5345,U+534b-534d,U+534f-5350,U+5358,U+535e-535f,U+5362-5364,U+5367,U+5369,U+536b-536c,U+536e-536f,U+5372,U+5374,U+5379-537a,U+537c-537d,U+5382,U+5385,U+5389,U+538b-538c,U+538e,U+5392-5396,U+5399,U+53a0-53a2,U+53a4-53a6,U+53a8-53a9,U+53ae,U+53b0,U+53b3-53b4,U+53b6-53b7,U+53b9,U+53bf,U+53c1,U+53c4,U+53ce-53cf,U+53d2,U+53d5,U+53d9-53da,U+53df-53e1,U+53e7-53e9,U+53f1,U+53f5-53f6,U+53f9,U+53fb-53fd,U+5400-5402,U+5405-5407,U+540f,U+5412,U+5414-5417,U+541a,U+5420-5421,U+5424-5425,U+5428-5429,U+542c-542f,U+5431-5432,U+5434,U+5437,U+543d,U+543f,U+5441,U+5444-5445"],
  [huninn4, "U+a3,U+2ca,U+2223,U+2640,U+273f,U+301c-301d,U+3107,U+310c,U+4e30,U+4e3e,U+4e5e,U+4e71,U+4f26,U+4f7c,U+4f83,U+50da,U+5243,U+5267,U+529e,U+5321,U+5352,U+5477,U+548b,U+54a6,U+54b2,U+54c2,U+54c4,U+54c6,U+54cd,U+54ee,U+5543,U+55d1,U+55d3,U+55f0,U+55fd,U+560d,U+5629,U+5660,U+57ae,U+57e0,U+57e4,U+5904,U+592d,U+5965,U+5a31,U+5a7f,U+5b5a,U+5bb8,U+5c14,U+5c3b,U+5c5c,U+5c5e,U+5d10,U+5e10,U+5e4c,U+603b,U+604d,U+611c,U+6137,U+61c8,U+6292,U+62c7,U+6371,U+6382,U+645f,U+64ae,U+64c2,U+651e,U+65f1,U+660a,U+663e,U+673d,U+6784,U+6789,U+67ff,U+6813,U+6854,U+68d8,U+68fa,U+697d,U+6a01,U+6a1e,U+6baf,U+6c08,U+6c17,U+6c2b,U+6c81,U+6cbd,U+6dc6,U+6df9,U+6ed9,U+6ee1,U+6f86,U+6fc1,U+6fdb,U+701f,U+7076,U+715c,U+7194,U+71fb,U+720d,U+72b6,U+7396,U+73af,U+745b,U+746f,U+748b,U+7647,U+7699,U+76bf,U+76ce,U+76de,U+77aa,U+786b,U+7881,U+78ca,U+793c,U+797a,U+79b9,U+79bb,U+79bf,U+7a92,U+7ac7,U+7ae3,U+7b19,U+7b20,U+7b51,U+7b94,U+7cbd,U+7cde,U+7cef,U+7d46,U+7dde,U+7f88,U+80da,U+814b,U+81cd,U+8235,U+8258,U+8282,U+82b9,U+846b,U+84c1,U+84d3,U+8518,U+8611,U+8783,U+8814,U+8a15,U+8aa6,U+8b2c,U+8ba8-8ba9,U+8bc6,U+8be2,U+8be6,U+8c22,U+8d05,U+8d27,U+8dbe,U+8e34,U+8e66,U+8ec0,U+9005,U+9082,U+9091,U+914b,U+916f,U+92c5,U+92f0,U+9318,U+9382,U+938a,U+93e2,U+964b,U+96c1,U+96cc-96cd,U+96db,U+973e,U+97a0,U+9803,U+9876,U+9879,U+9955,U+9986,U+99f1,U+9a5b,U+9abc,U+9c57,U+9c9c,U+9d1b,U+9d26,U+9d51,U+9eef,U+9f99,U+c2a4,U+e253,U+e313-e314,U+e5c7,U+e5c9,U+e8db-e8dc,U+ff25,U+ff2d-ff2e,U+ff34,U+ffe5,U+1f60a,U+1f618,U+1f62d"],
  [huninn5, "U+b4,U+10d,U+2d9,U+641,U+6cc,U+e20,U+e29,U+200e,U+20ac,U+2266,U+25be,U+301e,U+3058,U+4e07,U+4e1d,U+4e66,U+4ece,U+4fde,U+5016,U+5180,U+5199,U+51aa,U+5306,U+5386,U+53d8,U+5413,U+541d,U+5436,U+54ce,U+54e8,U+54fc,U+5571,U+557e,U+558e,U+55a7,U+56a8,U+57a2-57a3,U+58b3,U+5960,U+5992-5993,U+59a4,U+5a55,U+5ab2,U+5afb,U+5b56,U+5bc5,U+5bc7,U+5bf0,U+5cb1,U+5cc7,U+5dff,U+5e93,U+5ed3,U+5f6a,U+60bc,U+61ff,U+6218,U+6254,U+634d,U+6467,U+64f1-64f2,U+6582,U+65fb,U+6615,U+6687,U+66e6,U+66f0,U+6781,U+67f5,U+68a7,U+6a1f,U+6b27,U+6b4e,U+6b73,U+6b79,U+6bcb,U+6c5d,U+6cf5,U+6dee,U+6ec4,U+6ecc,U+6f88,U+6fef,U+701d,U+703e,U+707c,U+7099,U+710a,U+725f,U+72d9,U+72e9,U+731d,U+7325,U+739f,U+7463,U+7480,U+74a8,U+7523,U+7526,U+75e0,U+7613,U+7656,U+76d4,U+773a,U+775c,U+775e,U+780c,U+78e1,U+78f7,U+7960,U+7a20,U+7aaf,U+7b08,U+7b71,U+7be4,U+7cec,U+7cf0,U+7d5e,U+7d62,U+7dbe,U+7e1b,U+7ea2,U+7ec4,U+7ec6,U+7edc,U+7eed,U+7efc,U+7f16,U+7f57,U+7fb9,U+7fca,U+803d,U+816e,U+82a5,U+82b7,U+8317,U+8338,U+834a,U+83d3,U+8401,U+8469,U+849e,U+854a,U+8559,U+865e,U+86e4,U+8700,U+8759,U+8760,U+8778,U+8782,U+879e,U+87d1,U+880d,U+8836,U+8944,U+89c8,U+8aac,U+8b74,U+8ba2,U+8ba4,U+8bae,U+8bfb,U+8c4e,U+8cb3,U+8cb6,U+8d16,U+8d28,U+8e44,U+8f3b,U+8f3f,U+8f91,U+8fb9,U+8fc4,U+8fde,U+8ff9,U+9076,U+90ae,U+90b8,U+9257,U+9310,U+93df,U+94fe,U+95a5,U+95a9,U+962e,U+968f-9690,U+9704,U+9713,U+97f6,U+9824,U+986b,U+9884,U+9886,U+98e2,U+991a,U+99a5,U+99dd,U+9ab8,U+9b41,U+9b77,U+9bad,U+c774,U+e5d4,U+fe52,U+ff02,U+1f389,U+1f449,U+1f495"],
  [huninn6, "U+2cb,U+5d1,U+5d9,U+5e2,U+5e8,U+5ea,U+633,U+e32,U+2252,U+2267,U+2573,U+25b3,U+25c4,U+2713,U+2715,U+30e2,U+4e28,U+4e3c,U+4e4d,U+4e70,U+4f88,U+4fef,U+5018,U+501a,U+5026,U+5137,U+513f,U+51f3,U+524b,U+5254,U+52d8,U+5308,U+5384,U+53cc,U+5443,U+5466,U+54a7-54a8,U+54bd,U+54c9,U+54cb,U+555e,U+556a,U+5580,U+560e,U+5614,U+561f,U+562f,U+566c,U+5679,U+56bc,U+56cd,U+56e7,U+56ed,U+572d,U+57d7,U+582f,U+589f,U+5b09,U+5ba5,U+5c51,U+5c90,U+5cef,U+5d16,U+5d84,U+5dd4,U+5e08,U+5e26,U+5f0a,U+5f20,U+606c,U+61c7,U+620f,U+625b,U+62a4,U+62d0,U+62f1,U+63a0,U+63c6,U+63f9,U+6413,U+6417,U+6483,U+64f7,U+650f,U+65a7,U+665f,U+66ae,U+66d6,U+66e0,U+6746,U+6756,U+67d1,U+6837,U+68d7,U+68e0,U+68f5,U+6977,U+6995,U+69a8,U+69b4,U+69d3,U+6a3d,U+6abb,U+6bb7,U+6bd3,U+6c47,U+6cc4,U+6cd3,U+6dae,U+6e26,U+6e29,U+6e5b,U+6eaf,U+6eba,U+7028,U+70b3,U+711a,U+733f,U+73c0,U+73ee,U+7444,U+745a,U+7487,U+7540,U+75a4,U+7729,U+779e,U+798e,U+79cd,U+79e9,U+7a3d,U+7a4c,U+7a9f,U+7ac4,U+7aff,U+7b77,U+7c27,U+7ca7,U+7cd9,U+7d76,U+7e43,U+7ea6,U+7ed9,U+7ff1,U+808b,U+809b,U+80fa,U+827a,U+8309,U+8328,U+832b,U+8396,U+83e0,U+840e,U+8425,U+852d,U+853b,U+8588,U+85e9,U+86b5,U+8718,U+87ec,U+8910,U+893b,U+89c1-89c2,U+8b3e,U+8baf,U+8bc1,U+8bcd,U+8bdd,U+8c41,U+8c48,U+8d2d,U+8d5e,U+8fbe,U+9015,U+90a8,U+90b5,U+90e1,U+9169,U+9183,U+91d0,U+91dc,U+9293,U+92f8,U+9472,U+9598,U+95ed,U+95fb,U+9605,U+96c7,U+9739,U+9742,U+9761,U+99ad,U+9ae6,U+9b1a,U+9b44,U+9bc9,U+9d3f,U+9dd7,U+9e7c,U+9e92,U+fe5d-fe5e,U+ff22-ff24,U+ff2f-ff30,U+ff33"],
  [huninn7, "U+60,U+f7,U+161,U+2198,U+2571,U+258b,U+25b6,U+2661,U+3051,U+3109,U+4e11,U+4e1c,U+4e24,U+4e2b,U+4ef7,U+4f18,U+4f36,U+4fd0,U+5029-502a,U+5055,U+508d,U+50ad,U+50d5,U+50e7,U+50f1,U+50f5,U+51a5,U+51c8,U+51fb,U+5203,U+524e,U+5288,U+5323,U+53c2,U+5458,U+54b1,U+54b3,U+54b8,U+5582,U+55b2,U+55ba,U+55da,U+55dc,U+5662,U+5678,U+56c2,U+5742,U+57d5,U+5862,U+58e4,U+58f0,U+5907,U+590d,U+5934,U+5978,U+5984,U+5a25,U+5c06,U+5c62,U+5c91,U+5cfb,U+5d01,U+5d11,U+5d1b,U+5e87,U+5eff,U+5f27,U+5f3a,U+5f53,U+5f64,U+6001,U+6168,U+61a9,U+6233,U+62a5,U+62ce,U+62ed,U+638f,U+6399,U+63c0,U+646f,U+6590,U+6631,U+664f,U+6689,U+66dc,U+672f,U+67af,U+67ec,U+6807,U+6a44,U+6c14,U+6c40,U+6c70,U+6c76,U+6cb8,U+6ce3,U+6df3,U+6e20,U+6e43,U+6ebc,U+6eec,U+6f2c,U+6fb1,U+7009,U+7011,U+701a,U+7117,U+7184,U+72f9,U+7426,U+74bd,U+74cf,U+752b,U+7554,U+75b9,U+7621,U+7671-7672,U+7693,U+76ef,U+7737,U+77a7,U+77b3,U+77bb,U+77da,U+77e2,U+77e9,U+77ef,U+7801,U+7940,U+797f,U+79a7,U+79b1,U+79bd,U+7a6b,U+7ac5,U+7b1b,U+7dab,U+7db4,U+7db8,U+7dcb,U+7ddd,U+7de0,U+7e55,U+7e9c,U+7ed3,U+7ef4,U+803f,U+8046,U+8087,U+8116,U+81a8,U+8214,U+821c,U+82d4,U+8305,U+831c,U+8335,U+8339,U+8350,U+8354,U+8526,U+860a,U+86db,U+8713,U+873b,U+8822,U+8993,U+8a1f,U+8ab9,U+8ad7,U+8e72,U+8f4e,U+8f9c,U+8fd0,U+8fd8,U+8fe6,U+9042,U+907c,U+91ba,U+9452,U+9591,U+95e2,U+9631,U+9699,U+96b8,U+9709,U+978d,U+9811,U+9830,U+98ce,U+9945,U+99ed,U+9a8c,U+9ad3,U+9baa,U+9be8,U+9c77,U+9cf6,U+9d72,U+9e1f,U+9ec4,U+fe31,U+fe55,U+ff03,U+ff20,U+ff3b,U+ff3d,U+1f3fb,U+1f44d,U+1f60d"],
  [huninn8, "U+10c,U+e44,U+2728,U+3081,U+4e13,U+4e19,U+4e1e,U+4e5c,U+4ea7,U+4ed7,U+4f20,U+4f8d,U+4ffe,U+5021,U+515c,U+51a4,U+51e0,U+521b,U+522b,U+532a,U+534e,U+5355,U+537f,U+5398,U+539d,U+541f,U+543c,U+544e,U+5509,U+5598,U+5622,U+5632,U+563f,U+5641,U+566a,U+5695,U+569f,U+56ae,U+56da,U+573a,U+574e,U+5835,U+584c,U+5885,U+58ae,U+5a1f,U+5ac2,U+5b24,U+5bb0,U+5bde,U+5be1,U+5bfc,U+5c39,U+5c4c,U+5c60,U+5e76,U+5e7f,U+5e9a,U+5eb8,U+5f13,U+5f6c,U+6127,U+61f2,U+6208,U+620a,U+620c,U+6252,U+62ef,U+6328,U+633d,U+6362,U+63b0,U+63c9,U+640f,U+64a9,U+6514,U+652c,U+655e,U+6583,U+658c,U+6627,U+66f3,U+6734,U+6743,U+676d,U+67c4,U+67da,U+68cd,U+68f2,U+690e,U+6ab3,U+6b16,U+6b38,U+6b3d,U+6bc6,U+6ca1,U+6cab,U+6d8c,U+6dea,U+6e32,U+6e3e,U+6e58,U+6eef,U+6ef2,U+6fe4,U+708a,U+7130,U+7165,U+7172,U+71c9,U+71ed,U+7232,U+7239,U+7261,U+7280,U+72a7,U+72f8,U+73c8,U+7464,U+753b,U+754f,U+755c,U+75d8,U+76ea,U+776b,U+7779,U+777f,U+7784,U+778e,U+77db,U+77ee,U+79e4,U+7a46,U+7a57,U+7aba,U+7aed,U+7b4d,U+7c7b,U+7c7d,U+7d13,U+7d33,U+7dbb,U+7df9,U+7e46,U+7ea7,U+8085,U+8165,U+81fb,U+82b8,U+82d3,U+8343,U+839e,U+83e9,U+840d,U+851a,U+853d,U+8543,U+859b,U+85fb,U+87fb,U+888d,U+88c5,U+8adc,U+8b0a,U+8bb0,U+8bbe,U+8bc4,U+8bf4,U+8c5a,U+8cc3,U+8ce4,U+8d44,U+8e81,U+8f44,U+8f66,U+8fdb,U+900d,U+9063,U+914c,U+9223,U+9226,U+923a,U+925b,U+9264,U+929c,U+92b9,U+9320,U+934d,U+935b,U+9444,U+957f,U+96a7,U+97ad,U+97cc,U+9898,U+98ea,U+9921,U+9952,U+9a55,U+9b0d,U+9b91,U+9bca,U+9ebd,U+9f4b,U+e60f-e610,U+ff1c-ff1d,U+ff21,U+ff38,U+ff9f,U+fffd,U+1f602"],
  [huninn9, "U+e17,U+e22,U+2103,U+25a0,U+266a,U+3014-3015,U+4e1a,U+4e50,U+4f10,U+4f6c,U+4f70,U+4fcf,U+5006,U+50d1,U+5170,U+518c,U+51f0,U+51f6,U+51f9,U+5219,U+5256,U+525d,U+52c9,U+5349,U+5351,U+5356,U+5375,U+53db,U+53ee,U+53f7,U+5492,U+54fa,U+5538,U+55bb,U+55e8,U+5757,U+58be,U+5937,U+59dc,U+59e8,U+5a49,U+5a9a-5a9b,U+5ab3,U+5b9b,U+5b9e,U+5be8,U+5c37,U+5c4e,U+5d14,U+5d19,U+5d4c,U+5d50,U+5deb,U+5e84,U+5e94,U+5ec2,U+5f17,U+5f26,U+5f55,U+5f77,U+5f7f,U+5fbd,U+6052,U+6064-6065,U+608d,U+609a,U+6101,U+611a,U+614c,U+621a,U+6237,U+6284,U+6296,U+62e9,U+632a-632b,U+634f,U+6488,U+6500,U+652a,U+6556,U+65e0,U+65ec,U+6643,U+679a,U+6850,U+6893,U+6897,U+68b3,U+68d5,U+6930,U+6960,U+6a11,U+6a38,U+6a3a,U+6b22,U+6b67,U+6b6a,U+6c59,U+6c83,U+6ccc,U+6df5,U+6ef7,U+6f3e,U+6f80,U+70ed,U+7164,U+722a,U+7260,U+7272,U+73b0,U+74ca,U+74e3,U+7538,U+7586,U+75b5,U+7624,U+7661-7662,U+7838,U+786e,U+788c,U+7950,U+79a6,U+79aa,U+7a40,U+7a62,U+7bf7,U+7c3e,U+7c98,U+7ca5,U+7d21,U+7d2e,U+7dba,U+7dec,U+7e79,U+7ecf,U+7edf,U+7f79,U+8086,U+810a,U+8139,U+813e,U+817a,U+81b3,U+821f,U+8247,U+8259,U+8271,U+8431,U+846c,U+849c,U+84b2,U+84c4,U+8513-8514,U+8549,U+8755,U+8877,U+8881,U+88f9,U+8a1d,U+8a3c,U+8a6d-8a6e,U+8a93,U+8ae7,U+8af7,U+8b17,U+8b5a,U+8ba1,U+8bba,U+8cdc,U+8dea,U+8f6c,U+8f7d,U+8fc7,U+8fd9,U+902e,U+90ca,U+916a,U+916c,U+921e,U+9245,U+947c,U+9594,U+95a8,U+95ee,U+95f4,U+9706,U+971e,U+9756,U+980c,U+9891,U+98b1,U+98fc,U+9903,U+9957,U+99ae,U+99ff,U+9db4,U+e602-e605,U+e611,U+ff16-ff19"],
  [huninn10, "U+a5,U+2190-2191,U+2193,U+22c1,U+2302,U+25cb,U+2699,U+2709,U+4e0e,U+4e18,U+4e3a,U+4e48,U+4e91,U+4eec,U+4f3d,U+5112,U+524a,U+52a3,U+52ab,U+52c3,U+52f3,U+52fb,U+5320,U+5339,U+533f,U+53e2,U+543e,U+5480,U+5495,U+5497,U+5564,U+5572,U+55c6,U+55ef,U+563b,U+5653,U+5657,U+56b7,U+5764,U+5824,U+58d8,U+5955,U+5983,U+598d,U+59a8,U+59da,U+59e6,U+5a36,U+5bb5,U+5bc2,U+5bee,U+5bf9,U+5cb3,U+5d17,U+5dbc,U+5e2e,U+6070,U+60df,U+6190,U+61a4,U+61be,U+61fc,U+62ac,U+62bc,U+636e,U+6398,U+63a9,U+6435,U+6487,U+6495,U+64ab,U+64bf,U+6577,U+65ac,U+6602,U+6652,U+66f9,U+672d,U+6761,U+683d,U+68ad,U+68b5,U+68da,U+68e7,U+6a59,U+6a61,U+6ae5,U+6b47,U+6bef,U+6c50,U+6c9b,U+6e23,U+6e34,U+6e4a,U+6e67,U+6ea2,U+6eb6,U+6f20,U+6feb,U+7149,U+714c,U+715e,U+7199,U+71ac,U+7231,U+7262,U+7409,U+745f,U+7469,U+7504,U+7535,U+753a,U+75f4,U+7682,U+76ba,U+76f2,U+77fd,U+780d,U+7832,U+78c5,U+78ef,U+7901,U+79be,U+79c9,U+79e6,U+7a1a,U+7a84,U+7aca,U+7cb5,U+7cb9,U+7cdf,U+7ce7,U+7d6e,U+7db1,U+7def,U+7e61,U+7e7d,U+7e8f,U+7f38,U+7f77,U+7fa8,U+7fc5,U+7fe1,U+7ff9,U+800d,U+8015,U+8054,U+80a2,U+80aa,U+80ba,U+814e,U+8180,U+819d,U+81c0,U+828b,U+82ad,U+82af,U+83f1,U+83f8,U+8403,U+8475,U+84bc,U+84c9,U+84ec,U+8523,U+8569,U+8591,U+85b0,U+86d9,U+8774,U+881f,U+884d,U+88d4,U+89c4,U+89c6,U+8a60,U+8a79,U+8b19,U+8bd5,U+8bf7,U+8c03,U+8c79,U+8cc8,U+8d9f,U+8e10,U+8e48,U+8faf,U+9009,U+9017,U+9175,U+9187,U+918b,U+91d8,U+9214,U+946b,U+9470,U+9640,U+9675,U+96ef,U+9716,U+97cb,U+97e9,U+985b,U+99b3,U+9b4f,U+9d09,U+9e9f,U+9edb,U+9f90,U+ff05,U+ff14,U+1f464"],
  [huninn11, "U+25ce,U+4e08,U+4e2a,U+4e56,U+4e9a,U+4ea8,U+4ead,U+4ec7,U+4f3a,U+4f51,U+4f62,U+4faf,U+507d,U+5098,U+50ac,U+5147,U+5173,U+5187,U+51f8,U+52a1,U+52a8,U+52f8,U+535c,U+53ed,U+541e,U+5435,U+5475,U+54a9,U+54c0,U+54c7,U+5589,U+5605,U+5690,U+5733,U+5782,U+57c3,U+5858,U+5893,U+589c,U+58e2,U+5974,U+599e,U+59a5,U+59ec,U+5b66,U+5b99,U+5b9d,U+5c2c,U+5c48,U+5c65,U+5cfd,U+5d0e,U+5dba,U+5de2,U+5e06,U+5e15,U+5ec1,U+5ed6,U+5f00,U+5f4c,U+5f65,U+6055,U+609f,U+60b6,U+6241,U+624e,U+626f,U+6291,U+62cc,U+62d3,U+62d8,U+62da,U+62fe,U+6349,U+6367,U+63ea,U+6454,U+64a4,U+64b2,U+64bc,U+64c5,U+64ce,U+6558,U+6572,U+65a5,U+65e8,U+65ed,U+6606,U+6614,U+6670,U+6688,U+673a,U+674f,U+6770,U+6795,U+68cb,U+6912,U+6953,U+6aac,U+6aaf,U+6ab8,U+6b20,U+6b96,U+6bbf,U+6bc5,U+6c6a,U+6cbe,U+6d59,U+6d78,U+6dc7,U+6deb,U+6e7e,U+6e9c,U+6f3f,U+6f51,U+6f70,U+6f84,U+704c,U+7051,U+70ab,U+70ad,U+70f9,U+7119,U+714e,U+71d9,U+71e5-71e6,U+72c4,U+72d0,U+72e0,U+7334,U+744b,U+7455,U+74f7,U+7529,U+75ab,U+75b2,U+766e,U+76c3,U+76fc,U+76fe,U+7891,U+7948,U+7a74,U+7b28,U+7c60,U+7c72,U+7cca,U+7ebf,U+7f55,U+7ff0,U+8154,U+81c2,U+81d8,U+81e3,U+81e5,U+8292,U+8299,U+8302,U+8304,U+8332,U+83c1,U+83c7,U+83ca,U+845b,U+8490,U+85af,U+8650,U+8667,U+8abc,U+8b0e,U+8b39,U+8bed,U+8c54,U+8c6b,U+8c9e,U+8ca7,U+8caa-8cab,U+8ce6,U+8cec-8ced,U+8eb2,U+8eba,U+8fb0,U+901d,U+908f,U+9127,U+91c0,U+9215,U+92b3,U+932b,U+93fd,U+95ca,U+964c,U+96c0,U+970d,U+9774,U+97fb,U+9812,U+9817,U+9913,U+9935,U+99c1,U+9b31,U+9d5d,U+9d6c,U+9e79,U+fe0f,U+fe30,U+ff0b,U+ff10,U+ff15"],
  [huninn12, "U+b0,U+926,U+928,U+939,U+93f-940,U+94d,U+200b,U+22ef,U+25ba,U+25c6,U+2665,U+4e4f,U+4e59,U+4f0d,U+4f0f,U+4f19,U+4f59,U+4fae,U+5075,U+50b2,U+50b5,U+511f,U+5141,U+5146,U+514c,U+5185,U+51dd,U+51fd,U+522e,U+5319,U+533a,U+5378,U+53ad,U+53c9,U+53d1,U+53d4,U+543b,U+5442,U+5446,U+5481,U+54e9,U+5507,U+5565,U+559a,U+55aa,U+5606,U+56ca,U+56fe,U+582a,U+58fa,U+5915,U+5949,U+5962,U+5996,U+59fb,U+5a77,U+5b0c,U+5b5f,U+5bd3,U+5be2,U+5bfa,U+5c41,U+5ca9,U+5d07,U+5ec8,U+5eca,U+5f18,U+5f4e,U+5f59,U+5f6d,U+5f79,U+5fb9,U+6028,U+6062,U+6068,U+606d,U+6094,U+60f1,U+6108-6109,U+614e,U+6170,U+617e,U+61b2,U+61f8,U+6247,U+626d,U+6276,U+62ab,U+62cb,U+62f3,U+6368,U+6380,U+6492,U+64b0,U+64e0,U+6570,U+660f,U+6649,U+6691,U+66a8,U+6749,U+67f1,U+67f3-67f4,U+6842,U+6851,U+687f,U+68df,U+69fd,U+6a58,U+6c27,U+6c88,U+6cca,U+6cdb,U+6d29,U+6d66,U+6daf,U+6f01,U+6f06,U+6f58,U+6f62,U+6f6d,U+6fa1,U+6ff1,U+6ffe,U+7058,U+70ae,U+7235,U+7267,U+73ca,U+742a,U+758f,U+75bc,U+76c6,U+7740,U+7955,U+7a00,U+7a3b,U+7b4b,U+7bad,U+7be9,U+7c4c,U+7cfe,U+7dbf,U+7e2b,U+7e31,U+7f9e,U+7fc1,U+7ffc,U+8096,U+809d,U+80de,U+8108,U+8155,U+816b,U+81df,U+8277,U+82bd,U+8352,U+8393,U+8404,U+8525,U+856d,U+8587,U+8606,U+868a,U+8776,U+87ba,U+87f9,U+886b,U+8870,U+88d5,U+896a,U+896f,U+8a23,U+8a87,U+8ad2,U+8b00,U+8b20,U+8cb8,U+8cca,U+8ce0,U+8d39,U+8d6b,U+8d81,U+8db4,U+8e29,U+8ef8,U+8f1b,U+8f5f,U+8fa8,U+906e,U+9077,U+90aa,U+90b1,U+90c1,U+9165,U+919c,U+92c1,U+95d6,U+95e8,U+975a,U+98c6,U+9ecf,U+9f0e,U+9f52,U+feff,U+ff06,U+ff0a,U+ff12-ff13"],
  [huninn13, "U+627-629,U+631,U+639,U+644,U+64a,U+25cf,U+2606,U+2764,U+3008-3009,U+4e1f,U+4e38,U+4e43,U+4ed5,U+4ef0,U+4eff,U+4fb6,U+4fe0,U+5085,U+50a2,U+50be,U+5118,U+5211-5212,U+5272,U+52fe,U+5366,U+53b2,U+53ec,U+54ac,U+5587,U+55b5,U+561b,U+5751,U+576a,U+57cb,U+58ef,U+592f,U+594f,U+5951,U+5954,U+596e,U+59d1,U+5ac1,U+5acc,U+5b8b,U+5c4d,U+5c6f,U+5ca1,U+5d29,U+5de1,U+5dfe,U+5e7d,U+5edf,U+5ef7,U+5f7c,U+5f81,U+5fa1,U+5faa,U+5fcc,U+5ffd,U+6021,U+6046,U+6155,U+6212,U+62b9,U+6316,U+6350,U+6478,U+647a,U+6490,U+64e6,U+6524,U+6591,U+659c,U+65a4,U+65e6,U+65f6,U+6607,U+6674,U+6765,U+679d,U+68a8,U+6b3a,U+6c57,U+6c61,U+6c90,U+6cbf,U+6d69,U+6db5,U+6dcb,U+6dd1,U+6e21,U+70d8,U+71c3,U+71d5,U+722c,U+727d,U+72ac,U+72fc,U+731c,U+7336,U+7344,U+7384,U+73ab,U+7433-7434,U+745c,U+7470,U+758a,U+75d5,U+7652,U+76c8,U+76e7,U+7709,U+7720,U+7747,U+7763,U+77ac-77ad,U+7802,U+78a7,U+78a9,U+78b3,U+78c1,U+78da,U+7926,U+796d,U+798d,U+7aae,U+7b52,U+7c92,U+7d68,U+7d81,U+7e5e,U+7e69,U+7e73,U+7f50,U+7f70,U+7f75,U+8058,U+8070,U+80c3,U+8105-8106,U+8179,U+818f,U+81a9,U+81ed,U+820c-820d,U+82d1,U+838e,U+83cc,U+8461,U+84b8,U+852c,U+857e,U+85e4,U+863f,U+8679,U+86c7,U+8702,U+8896,U+88c2,U+88f8,U+8af8,U+8b7d,U+8ca2,U+8cc0,U+8d64,U+8d74,U+8d99,U+8e5f,U+8e8d,U+8ecc,U+8ed2,U+8fb1,U+8fc5,U+9022,U+9038,U+903e,U+905c,U+9072,U+9081,U+9189,U+9234,U+92d2,U+934a,U+95a3,U+962a,U+9646,U+9676,U+96d5,U+971c,U+9838,U+9875,U+98c4,U+99db,U+9a45,U+9a5f,U+9a6c,U+9ad2,U+9cf4,U+9d28,U+9daf,U+9df9,U+9e7d,U+9f9c,U+ff11,U+ff1e"],
  [huninn14, "U+2500,U+25bc,U+4e95,U+4f50,U+4f54,U+4f69,U+4fc4,U+4fca,U+5009,U+50bb,U+5154,U+51cc,U+528d,U+5291,U+52d2,U+52e4,U+5353,U+5360,U+540a-540b,U+5410,U+54f2,U+5510,U+5514,U+5537,U+558a,U+55ac,U+5617,U+56fd,U+573e,U+5766,U+5783,U+57d4,U+5806,U+5821,U+5857,U+5875,U+58f9,U+596a,U+59ae,U+59c6,U+59ca,U+59ff,U+5a03,U+5ae9,U+5b64,U+5bb4,U+5c3f,U+5e16,U+5e45,U+5e72,U+5ec9,U+5f90-5f92,U+6012,U+6016,U+6084-6085,U+6089,U+60a0,U+60a3,U+60b2,U+60d1,U+60f9,U+6148,U+6158,U+6191,U+626e,U+62d4,U+632f,U+633a,U+6355,U+63aa,U+642c,U+64a5,U+64cb,U+6566,U+6575,U+6597,U+660c,U+66b1,U+66ec,U+6731,U+6735,U+675c,U+67ef,U+6846,U+6876,U+6881,U+68af-68b0,U+68c9,U+6905,U+6b98,U+6bc0,U+6beb,U+6c0f,U+6c1b,U+6c41,U+6ce5,U+6cf3,U+6d25,U+6d2a,U+6d3d,U+6d6e,U+6dd8,U+6dda,U+6dfa,U+6e9d,U+6eaa,U+6ec5,U+6ecb,U+6ef4,U+6f0f,U+6f32,U+707d,U+708e,U+7092,U+716e,U+723a,U+731b,U+7345,U+7375,U+7378,U+73b2,U+74e6,U+75be,U+75de,U+764c,U+76dc,U+788e,U+7897,U+789f,U+78b0,U+790e,U+7965,U+7a4e,U+7aa9,U+7c43,U+7d17,U+7dd2,U+7e96,U+7f51,U+7f69,U+7f72,U+7fd4,U+7fe0,U+8017,U+80a9,U+80d6,U+8102,U+8150,U+8178,U+81bd,U+829d,U+82ac,U+8303,U+840c,U+8482,U+8499,U+85a9-85aa,U+883b,U+8861,U+88c1,U+88cf,U+88d9,U+8a3a,U+8a98,U+8aee,U+8c8c,U+8ce2,U+8d0f,U+8da8,U+8dcc,U+8e0f,U+8e22,U+8f1d,U+8f29,U+8fad,U+9003,U+9006,U+903c,U+904d,U+9059,U+9075,U+90ce,U+90ed,U+9130,U+91ac,U+91e3,U+9285,U+9298,U+92ea,U+9326,U+937e,U+93c8,U+95c6,U+9677,U+9727,U+994b,U+99a8,U+99d0,U+9a30,U+9a37,U+9b42,U+9b45,U+9d3b,U+9e7f,U+9ee8,U+9f3b,U+c5b4"],
  [huninn15, "U+5e,U+2502,U+2605,U+4e32,U+4e58,U+4ea1,U+4ef2,U+4f2f-4f30,U+4f75,U+4fd7,U+4ff1,U+501f,U+5049,U+5074,U+5091,U+5144,U+517c,U+51c6,U+51cd,U+5269-526a,U+52aa,U+52c1,U+52c7,U+52df,U+5377,U+541b,U+5439,U+5440,U+5448,U+54aa,U+54e6,U+54ed,U+5674,U+5687,U+585e,U+588a,U+58a8,U+58c1,U+5925,U+5948,U+5999,U+59b3,U+5a1c,U+5a46,U+5b54,U+5b5d,U+5b6b,U+5b8f,U+5bd2,U+5be9,U+5c0a,U+5c16,U+5c46,U+5cf0,U+5e25,U+5e3d,U+5e79,U+5ee2,U+5f04,U+5f31,U+5fcd,U+5fe0,U+60dc,U+6163,U+616e,U+6182,U+61f6,U+622a,U+6258,U+6293,U+62c6,U+62d2,U+6372,U+63da,U+63ed-63ee,U+6416,U+6458,U+649e,U+64ec,U+64f4,U+651c,U+65cb,U+65e2,U+65fa,U+6628,U+6668,U+66a2,U+66c9,U+66fc,U+6717,U+67cf,U+67d4,U+6817,U+6885,U+69cd,U+6a6b,U+6afb,U+6b32,U+6b49,U+6bbc,U+6c89,U+6c96,U+6cc9,U+6d1b,U+6d1e,U+6dfb,U+6efe,U+6f38,U+6f5b,U+6f64,U+6f8e,U+6fa4,U+7070,U+70b8,U+70cf,U+70e4,U+7159,U+7169,U+7210,U+721b,U+7238,U+737b,U+73bb,U+746a,U+7483,U+74dc,U+74f6,U+7518,U+756a,U+75c7,U+775b,U+78e8,U+7919,U+7956,U+795d,U+7a0d,U+7bc9,U+7c97,U+7cd5,U+7d10,U+7d1b,U+7de9,U+7dfb,U+7e3e,U+7e6a,U+7f6a,U+7f8a,U+7fbd,U+8000,U+8036,U+809a,U+80ce,U+80e1,U+80f8,U+8170,U+819c,U+8216,U+8239,U+8266,U+827e,U+82b3,U+8377,U+83ab,U+85c9,U+865b,U+8766,U+87a2,U+87f2,U+8972,U+8a17,U+8a50,U+8a95,U+8b02,U+8b6f,U+8c6c,U+8ca9,U+8cfa,U+8d95,U+8de1,U+8f14,U+8f9b,U+8fa3,U+8feb,U+8ff4,U+9010,U+901b,U+905e,U+9080,U+912d,U+9177,U+91c7,U+9336,U+9451,U+947d,U+963b,U+966a,U+9670,U+9769,U+9813,U+98fd,U+99d5,U+9a19,U+9b27,U+9b6f,U+9ece,U+9ed8,U+9f13,U+9f20,U+ad6d,U+d55c"],
  [huninn16, "U+201c-201d,U+203b,U+2192,U+25b2,U+300f,U+4e01,U+4e39,U+4e73,U+4e88,U+4e8e,U+4ed9,U+4f0a,U+4f38,U+4f5b,U+4fc3,U+500d,U+504f,U+5076-5077,U+5100,U+5104,U+5132,U+5175,U+5192,U+51a0,U+51ac,U+51e1,U+51f1,U+5200,U+5224,U+5237-5238,U+523a,U+526f,U+5289,U+52de,U+52f5,U+5371,U+539a,U+53e5,U+540e,U+547c,U+552f,U+5531,U+5634,U+56c9,U+56f0,U+574a,U+5761,U+57f7,U+57f9,U+5805,U+5851,U+5854,U+586b,U+58fd,U+592e,U+5967,U+59bb,U+59d3,U+5a18,U+5b30,U+5b55,U+5b87,U+5b97,U+5be7,U+5bec,U+5bf8,U+5c24,U+5cb8,U+5df7,U+5e1d,U+5e2d,U+5e7b,U+5f1f,U+5f70,U+5fd9,U+61b6,U+6234,U+62b5,U+62d6,U+62dc,U+62fc,U+6383,U+63cf,U+63d2,U+63e1,U+640d,U+64cd,U+64fa,U+64fe,U+654f,U+6562,U+656c,U+65c1,U+65d7,U+6620,U+6676,U+6697,U+66ab,U+66c6,U+66dd,U+66ff,U+671d,U+672b,U+677e,U+67d0,U+67d3,U+68c4,U+690d,U+694a,U+695a,U+6ac3,U+6b04,U+6b23,U+6b78,U+6b8a,U+6c60,U+6d74,U+6d89,U+6db2,U+6dbc,U+6de1,U+6df7,U+6e38,U+6e6f,U+6f02,U+6fc3,U+6fd5,U+70c8,U+7126,U+718a,U+723d,U+7246,U+72af,U+73cd,U+760b,U+7626,U+7687,U+79df,U+7a05,U+7a3f,U+7a69,U+7af6,U+7c3d,U+7c3f,U+7c4d,U+7cd6,U+7d0b,U+7d2b,U+7de3,U+7e2e,U+8010,U+808c,U+80a5,U+80af,U+812b,U+817f,U+819a,U+82d7,U+8389-838a,U+83f2,U+840a,U+8463,U+8521,U+8584,U+860b,U+864e,U+871c,U+878d,U+885d,U+8932,U+89f8,U+8a69,U+8afe,U+8b5c,U+8c37,U+8c46,U+8cbf,U+8cd3,U+8cf4,U+8d08,U+8d0a,U+8ddd,U+8fea,U+9014,U+9055,U+907a,U+9178,U+92fc,U+934b,U+9396,U+93ae,U+9583,U+9663,U+96bb,U+9707,U+9738,U+9846,U+9905,U+9a0e,U+9aa8,U+9b25,U+9b3c,U+9ce5,U+9cf3,U+9ea5,U+9eb5,U+9f4a,U+9f61,U+ff0d"],
  [huninn17, "U+3c,U+d7,U+300e,U+4e4e,U+4e82,U+4e92,U+4ec1,U+4ecd,U+4f48,U+4f53,U+4fb5,U+5012,U+502b,U+522a,U+52dd,U+52ff,U+532f,U+53eb,U+53f3,U+5409,U+5433,U+5496,U+54c8,U+554a,U+5561,U+5594,U+559d,U+56b4,U+56fa,U+5713,U+5750,U+57df,U+584a,U+58c7,U+58de,U+593e,U+5976,U+59d0,U+59d4,U+5a66,U+5b85,U+5b88,U+5ba3,U+5bae,U+5bbf,U+5bdf,U+5c01,U+5c04,U+5c3a,U+5c3e,U+5c4f,U+5ddd-5dde,U+5de8,U+5e63,U+5e7c,U+5e8a,U+5eda,U+5ef3,U+5ef6,U+5f48,U+6015,U+6025,U+602a,U+6050,U+6069,U+60e1,U+6162,U+6176,U+61c2,U+6200,U+6263,U+6279,U+6297,U+62b1,U+62bd,U+62ec,U+6311,U+6377,U+6388-6389,U+638c,U+63a2,U+63f4,U+641e,U+6436,U+64c1,U+6551,U+6557,U+6563,U+6696,U+66b4,U+66f2,U+6751,U+675f,U+676f,U+6790,U+6838,U+684c,U+68d2,U+6982,U+699c,U+69ae,U+69cb,U+6a39,U+6a4b,U+6b66,U+6bd2,U+6cb3,U+6ce1,U+6d3e,U+6de8,U+6ed1,U+6f22,U+6f54,U+6fc0,U+6fdf,U+719f,U+71c8,U+7236,U+7259,U+72d7,U+7389,U+73e0,U+745e,U+751a,U+7532-7533,U+7562,U+7591,U+75c5,U+75db,U+7686,U+76d2,U+76db,U+76df,U+76e3,U+7701,U+7761,U+786c,U+7981,U+79cb,U+79d2,U+79fb,U+7a81,U+7a97,U+7aef,U+7b26,U+7b80,U+7c64,U+7d0d,U+7d14,U+7d2f,U+7dca,U+7df4,U+7e54,U+7e6b,U+7f3a,U+8033,U+804a,U+805a,U+81a0,U+81e8,U+8212,U+821e,U+82e6,U+8336,U+8449,U+84cb,U+84ee,U+85e5,U+8607,U+888b,U+8a13,U+8a5e,U+8aa0,U+8aa4,U+8ab0,U+8ab2,U+8ac7,U+8b66,U+8c6a,U+8c93,U+8c9d,U+8de8,U+8f2a,U+8fb2,U+906d,U+907f,U+90a6,U+9109,U+9192,U+91cb,U+91dd,U+964d,U+9686,U+968e,U+9694,U+969c,U+96de,U+96e8,U+96ea,U+96f7,U+975c,U+9760,U+978b,U+9858,U+9918,U+9aee,U+9ebb,U+ff0e-ff0f,U+ff5c"],
  [huninn18, "U+b7,U+2022,U+2027,U+3042,U+3044,U+3046,U+3048,U+304a-3050,U+3053-3057,U+3059-305b,U+305d-3061,U+3063-306c,U+306e-3079,U+307b,U+307d-307f,U+3082-308d,U+308f,U+3092-3093,U+30a1-30a4,U+30a6-30c1,U+30c3-30c4,U+30c6-30e1,U+30e3-30ed,U+30ef,U+30f3,U+30fb-30fc,U+4e7e,U+4ea6,U+4eac,U+4f34,U+50b7,U+51b0,U+523b,U+5283,U+5348,U+5354,U+54e5,U+5708,U+590f,U+592b,U+599d,U+59b9,U+5a01,U+5a5a,U+5de7,U+5e78,U+5e9c,U+5fb5,U+6167,U+61f7,U+627f,U+63a1,U+64d4,U+65bd,U+68ee,U+6b4c,U+6bba,U+6c5f,U+6d0b,U+6d6a,U+6e1b,U+6e56,U+6f6e,U+71d2,U+722d,U+72c2,U+751c,U+7530,U+7642,U+76e1,U+79c0,U+7adf,U+7af9,U+7d9c,U+7da0,U+7e23,U+7e41,U+8056,U+8173,U+822a,U+8349,U+83dc,U+8840,U+885b,U+8907,U+8a34,U+8cb4,U+8dd1,U+8fd4,U+8ff0,U+93e1,U+984f,U+98ef,U+9b54"],
  [huninn19, "U+23-25,U+3d,U+2026,U+4e03,U+4e45,U+4e5d,U+4eae,U+4ed4,U+4ed8,U+4f01,U+4f11,U+4f3c,U+4f8b,U+4fc2,U+5019,U+505c,U+50c5,U+5145,U+51b7,U+5207,U+521d,U+525b,U+5287,U+52e2,U+535a,U+537b,U+5426,U+542b,U+5438,U+5462,U+54ea,U+555f,U+5566,U+5584,U+5609,U+570d,U+571f,U+5747,U+5802,U+58d3,U+591c,U+5920,U+5922,U+5957,U+5979,U+5a92,U+5abd,U+5b63,U+5b69,U+5b83,U+5b9c,U+5bb3,U+5bc4,U+5bf5,U+5c3c,U+5c40,U+5c4b,U+5c64,U+5cf6,U+5de6,U+5e0c,U+5e55,U+5eab,U+5ead,U+5ee0,U+5f85,U+5f8b,U+5fa9,U+5fd7-5fd8,U+5ff5,U+600e,U+6298,U+62db,U+62ff,U+639b,U+63a7,U+642d,U+6469,U+64ad,U+651d,U+653b,U+65b7,U+65cf,U+665a,U+666e,U+66fe,U+6728,U+674e,U+67b6,U+6821,U+6839,U+6843,U+6a94,U+6b50,U+6b62,U+6b72,U+6b7b,U+6bcd,U+6bdb,U+6c38,U+6c7a,U+6c7d,U+6c99,U+6cb9,U+6ce2,U+6cf0,U+6d17,U+6d32,U+6e2c,U+6fb3,U+7206,U+723e,U+725b,U+734e,U+7387,U+73ed,U+7565,U+7570,U+76ca,U+76e4,U+773e,U+77ed,U+77f3,U+7814,U+7834,U+7968,U+79d8,U+7a76,U+7a7f,U+7b11,U+7b46,U+7b54,U+7bc4,U+7d19,U+7d20,U+7d22,U+7d42,U+7d55,U+7e7c,U+7f85,U+7ffb,U+8077,U+8089,U+80cc,U+81c9,U+81f4,U+81fa,U+820a,U+822c,U+826f,U+85cd,U+86cb,U+88dc,U+8986,U+8a0e,U+8a2a,U+8a73,U+8a8c,U+8b1b,U+8b9a,U+8c50,U+8c61,U+8ca0,U+8cde,U+8cfd,U+8d8a,U+8df3,U+8e64,U+8ecd,U+8edf,U+8f38,U+8ff7,U+9000,U+9047,U+9060,U+90f5,U+9152,U+91ce,U+9280,U+9418,U+9435,U+9589,U+9592,U+9678,U+967d,U+968a,U+96aa,U+96c5,U+96d6,U+96dc,U+96f6,U+9732,U+9748,U+9802,U+9806,U+9808,U+9818,U+983b,U+984d,U+9867,U+98db,U+98f2,U+98fe,U+9a5a,U+9b06,U+9b5a,U+9bae,U+9e97,U+ff1b,U+ff5e"],
  [huninn20, "U+26,U+40,U+5f,U+4e14,U+4e9e,U+4ec0,U+4f4e-4f4f,U+4f73,U+4fee,U+503c,U+5047,U+514b,U+516b,U+516d,U+5178,U+520a,U+5236,U+5343,U+5347,U+534a,U+5370,U+53cd,U+53e4,U+53e6,U+53f2,U+5403,U+5411,U+5427,U+5468,U+5473,U+547d,U+552e,U+55ce,U+5740,U+57ce,U+5883,U+589e,U+5931,U+5947,U+59cb,U+5a1b,U+5b58,U+5b98,U+5ba4,U+5bc6,U+5bcc,U+5beb,U+5bf6,U+5c45,U+5c6c,U+5dee,U+5df4,U+5e03,U+5e33,U+5e6b,U+5e7e,U+5e8f,U+5e95,U+5ea7,U+5f15,U+5f62,U+5f69,U+5f80,U+5fae,U+5fb7,U+601d,U+60e0,U+614b,U+6230,U+6236,U+623f,U+628a,U+6295,U+62c9,U+6309,U+63db,U+64c7,U+64ca,U+64da,U+652f,U+6545,U+6548,U+65af,U+65e9,U+6625,U+666f,U+667a,U+670b,U+671b,U+6750,U+677f,U+6848,U+6975,U+6a13,U+6a21,U+6aa2,U+6b65,U+6b77,U+6bb5,U+6cc1,U+6ce8,U+6df1,U+6e90,U+6e96,U+6eab,U+6f14,U+6f2b,U+700f,U+706b,U+724c,U+72c0,U+7368,U+7372,U+74b0,U+756b,U+76ae,U+773c,U+78ba,U+78bc,U+798f,U+79ae,U+7a4d,U+7ae5,U+7b56,U+7b97,U+7bb1,U+7bc7,U+7c73,U+7c89,U+7d00,U+7d30,U+7d39,U+7d72,U+7dad,U+7e8c,U+7f6e,U+7fa4,U+7fa9,U+7fd2,U+8003,U+807d,U+80a1,U+80b2,U+8166,U+8208-8209,U+82e5,U+843d,U+85cf,U+85dd,U+862d,U+8857,U+8863,U+88e1,U+89ba,U+89d2,U+8a31,U+8a62,U+8a66,U+8a72,U+8abf,U+8b1d,U+8b58,U+8b70,U+8b80,U+8ca1,U+8ca8,U+8cac,U+8cbc,U+8d70,U+8da3,U+8db3,U+8ddf,U+8f03,U+8f15,U+8f2f,U+8fa6,U+8fce,U+8ffd,U+900f,U+9031,U+9069,U+908a,U+91ab,U+91cc,U+92b7,U+9322,U+932f,U+9375,U+9632,U+963f,U+9644,U+9662,U+9673,U+96a8,U+96c4,U+96d9,U+96e2-96e3,U+96f2,U+9752,U+97d3,U+97ff,U+9805,U+9810,U+986f,U+990a,U+9910,U+9928,U+9ec3,U+9ed1,U+9f8d"],
  [huninn21, "U+3e,U+7e,U+3000,U+300a-300b,U+3010-3011,U+4e16,U+4e26,U+4e94,U+4e9b,U+4ea4,U+4eca-4ecb,U+4efb,U+4efd,U+4f46,U+4f55,U+4f9b,U+4f9d,U+4fbf,U+505a,U+5065,U+5099,U+50cf,U+50f9,U+512a,U+5143,U+5148,U+514d,U+5152,U+5169,U+5171,U+5177,U+518a,U+5217,U+5225,U+5247,U+5275,U+529f,U+52a9,U+5305,U+5341,U+5357,U+5361,U+5373,U+53bb,U+53c3,U+53c8,U+53d6-53d7,U+53e3,U+53ea,U+53f8,U+5404,U+559c,U+5668,U+56db,U+56e0,U+5712,U+5718,U+578b,U+57fa,U+58eb,U+592a,U+5c0b,U+5c0e,U+5c11,U+5c1a,U+5c55,U+5c71,U+5df1,U+5e2b,U+5e36,U+5e97,U+5eb7,U+5ee3,U+5efa,U+5f35,U+5f37,U+5f88,U+5f9e,U+5fc5,U+606f,U+60a8,U+6232,U+624d,U+6253,U+627e,U+6280,U+62cd,U+6301,U+6307,U+6392,U+63a5,U+6539,U+653e-653f,U+6559,U+6574,U+65c5,U+6613,U+66f8,U+672a,U+6797,U+67e5,U+6a19,U+6a23,U+6b61,U+6bcf,U+6bd4,U+6c11,U+6c42,U+6d41,U+6d77,U+6d88,U+6e05,U+6e2f,U+6eff,U+7136,U+7167,U+71df,U+738b,U+73a9,U+7403,U+7531,U+7537,U+754c,U+7559,U+767d-767e,U+76f4,U+793a,U+795e,U+79c1,U+79d1,U+7a2e,U+7a31,U+7a7a,U+7ae0,U+7ba1,U+7bc0,U+7c21,U+7cfb,U+7d04-7d05,U+7d1a,U+7d44,U+7d66,U+7d71,U+7de8,U+7e3d,U+8001,U+800c,U+805e,U+8072,U+81f3,U+82b1,U+82f1,U+83ef,U+842c,U+8457,U+85a6,U+8655,U+8853,U+88ab,U+88dd,U+88fd,U+897f,U+898f,U+89aa,U+89bd,U+89c0,U+89e3,U+8a02,U+8a3b,U+8a55,U+8a8d,U+8a9e,U+8ad6,U+8b49,U+8b77,U+8b8a,U+8b93,U+8cb7,U+8ce3,U+8cea,U+8cfc,U+8f09,U+8fd1,U+9001,U+901f-9020,U+9054,U+90a3,U+914d,U+91cf,U+9304,U+95b1,U+9650,U+9664,U+969b,U+96b1,U+96c6,U+9700,U+975e,U+97f3,U+98a8,U+98df,U+9999,U+99ac,U+9a57,U+9ebc"],
  [huninn22, "U+d,U+2b,U+7c,U+a0,U+a9,U+300c-300d,U+4e09,U+4e3b,U+4e4b,U+4e5f,U+4e86,U+4e8b-4e8c,U+4eab,U+4ed6,U+4ee3-4ee4,U+4ef6,U+4f1a,U+4f4d,U+4f60,U+4f7f,U+4f86,U+4fdd,U+4fe1,U+5011,U+50b3,U+5149,U+5167,U+5176,U+518d,U+5229,U+524d,U+529b,U+52a0,U+52d9,U+5316-5317,U+5340,U+539f,U+53ca-53cb,U+5408,U+540c-540d,U+544a,U+548c,U+54c1,U+54e1,U+5546,U+554f,U+55ae,U+56de,U+5716,U+5831,U+5834,U+5916,U+5929,U+5973,U+597d,U+5982,U+5b57,U+5b78,U+5b89,U+5b8c,U+5b9a,U+5ba2,U+5bb9,U+5be6,U+5c07-5c08,U+5c0d,U+5c31,U+5de5,U+5df2,U+5e02,U+5e38,U+5e73-5e74,U+5ea6,U+5f0f,U+5f71,U+5f8c,U+5f97,U+5feb,U+6027,U+60c5,U+60f3,U+610f,U+611b,U+611f,U+61c9,U+6210,U+6216,U+6240,U+624b,U+63a8,U+63d0,U+641c,U+6536,U+6578,U+6599,U+65b9,U+660e,U+661f,U+662d,U+66f4,U+670d,U+671f,U+6771,U+679c,U+682a,U+683c,U+689d,U+696d,U+6a02,U+6a5f,U+6b0a,U+6b21,U+6b3e,U+6b64,U+6c23,U+6c34,U+6c92,U+6cbb,U+6cd5,U+6d3b,U+7063,U+7121,U+71b1,U+7247-7248,U+7269,U+7279,U+73fe,U+7406,U+7522,U+7576,U+767b,U+76ee,U+76f8,U+770b,U+771f,U+77e5,U+793e,U+7a0b,U+7acb,U+7ad9,U+7b2c,U+7b49,U+7cbe,U+7d50,U+7d61,U+7d93,U+7dda,U+7f8e,U+8005,U+806f,U+80fd,U+81ea,U+8207,U+8272,U+865f,U+8868,U+8981,U+898b,U+8996,U+8a00,U+8a08,U+8a0a,U+8a18,U+8a2d,U+8a71,U+8aaa,U+8acb,U+8cbb,U+8cc7,U+8d77,U+8d85,U+8def,U+8eab,U+8eca,U+8f49,U+9019-901a,U+9023,U+9032,U+904a-904b,U+904e,U+9053,U+9078,U+9084,U+90e8,U+90fd,U+91cd,U+91d1,U+9577,U+9580,U+9593,U+9762,U+982d,U+984c,U+985e,U+9996,U+9ad4,U+9ad8,U+9ede,U+ff01,U+ff08-ff09,U+ff1f"],
  [huninn23, "U+20-22,U+27-2a,U+2c-3b,U+3f,U+41-5d,U+61-7b,U+7d,U+ab,U+ae,U+b2-b3,U+bb,U+bf-c2,U+c8-ca,U+cc-ce,U+d2-d4,U+d6,U+d9-db,U+e0-ef,U+f1-f4,U+f6,U+f9-fd,U+100-103,U+110-115,U+11a-11b,U+12a-12d,U+131,U+143-144,U+147-148,U+14c-151,U+16a-16d,U+170-171,U+1a1,U+1b0,U+1cd-1d4,U+1f8-1f9,U+300-302,U+304,U+306,U+30b-30d,U+358,U+1d3a,U+1e3e-1e3f,U+1ea1,U+1ea3,U+1ebf,U+1ec7,U+2013-2014,U+2039-203a,U+203c,U+207f,U+2122,U+3001-3002,U+3113-3114,U+3118,U+311a-3129,U+4e00,U+4e0a-4e0b,U+4e0d,U+4e2d,U+4eba,U+4ee5,U+4f5c,U+500b,U+5165,U+5168,U+516c,U+51fa,U+5206,U+5230,U+52d5,U+53ef-53f0,U+570b,U+5728,U+5730,U+591a,U+5927,U+5b50,U+5bb6,U+5c0f,U+5fc3,U+6211,U+6587,U+65b0,U+65bc,U+65e5,U+662f,U+6642,U+6700,U+6703,U+6708-6709,U+672c,U+6b63,U+70b9-70ba,U+751f,U+7528,U+767c,U+7684,U+7db2,U+884c,U+958b,U+95dc,U+96fb,U+9801,U+ff0c,U+ff1a"],
];
const fontFaceCss = HUNINN_FACES.map(
  ([src, range]) =>
    `@font-face{font-family:"LA Huninn";font-style:normal;font-weight:400;font-display:swap;src:url(${typeof src === "string" ? src : src.src}) format("woff2");unicode-range:${range};}`
).join("");

// ---------- 主視覺素材（已裁切壓縮為 WebP，放在 ./assets/lost-apartment/） ----------
import wordmarkWebImg from "./assets/lost-apartment/wordmark-web.webp"; // 標準字＋蜘蛛網（橫）
import wordmarkImg from "./assets/lost-apartment/wordmark.webp"; // 標準字（橫、無網）
import spiderYarnImg from "./assets/lost-apartment/spider-yarn.webp"; // 織蛛抱毛線球
import spiderQuestionImg from "./assets/lost-apartment/spider-question.webp"; // 織蛛・疑問
import spiderIdeaImg from "./assets/lost-apartment/spider-idea.webp"; // 織蛛・有靈感
import spiderNoticeImg from "./assets/lost-apartment/spider-notice.webp"; // 織蛛・公告
import spiderThanksImg from "./assets/lost-apartment/spider-thanks.webp"; // 織蛛・開心感謝
import spiderArrowLeftImg from "./assets/lost-apartment/spider-arrow-left.webp"; // 織蛛・左箭頭
import spiderArrowRightImg from "./assets/lost-apartment/spider-arrow-right.webp"; // 織蛛・右箭頭
import cursor32Img from "./assets/lost-apartment/cursor-spider-32.png"; // 滑鼠游標：織蛛
import cursor64Img from "./assets/lost-apartment/cursor-spider-64.png"; // 滑鼠游標：織蛛（高解析螢幕）
import doorClosedImg from "./assets/lost-apartment/door-closed.webp"; // 公寓門口（關）
import doorHalfImg from "./assets/lost-apartment/door-half.webp"; // 公寓門口（半開）
import doorOpenImg from "./assets/lost-apartment/door-open.webp"; // 公寓門口（全開）
import bgChalkImg from "./assets/lost-apartment/bg-chalk.webp"; // 社群背景圖 #1E1E24
import objIanImg from "./assets/lost-apartment/obj-ian-novel.webp"; // 逸安・綠色小說
import objYutingImg from "./assets/lost-apartment/obj-yuting-gamepad.webp"; // 宇廷・遊戲握把
import objSiyuImg from "./assets/lost-apartment/obj-siyu-diary.webp"; // 思予・手帳
import objMuweiImg from "./assets/lost-apartment/obj-muwei-camera.webp"; // 沐微・相機

// Vite / CRA 匯入圖片得到字串；Next.js 得到 { src }，兩種都支援
const img = (m) => (typeof m === "string" ? m : m && m.src);

const ASSETS = {
  wordmarkWeb: img(wordmarkWebImg),
  wordmark: img(wordmarkImg),
  spiderYarn: img(spiderYarnImg),
  cursor32: img(cursor32Img),
  cursor64: img(cursor64Img),
  spiderQuestion: img(spiderQuestionImg),
  spiderIdea: img(spiderIdeaImg),
  spiderNotice: img(spiderNoticeImg),
  spiderThanks: img(spiderThanksImg),
  spiderArrowLeft: img(spiderArrowLeftImg),
  spiderArrowRight: img(spiderArrowRightImg),
  doors: [img(doorClosedImg), img(doorHalfImg), img(doorOpenImg)],
  bgChalk: img(bgChalkImg),
  objects: {
    ian: img(objIanImg),
    yuting: img(objYutingImg),
    siyu: img(objSiyuImg),
    muwei: img(objMuweiImg),
  },
};

/* ------------------------------------------------------------------ */
/*  《若失公寓》LOST Apartment — 迷惘共振測驗                           */
/*  單一檔案 SPA：入住邀請 → 5 題情境測驗 → 房間推薦卡片               */
/* ------------------------------------------------------------------ */

// ---------- 四位租客（測驗結果錨點） ----------
const CHARACTERS = {
  ian: {
    key: "ian",
    name: "林逸安",
    en: "Ian",
    dept: "外文系・大三升大四",
    room: "301",
    roomName: "林逸安的文學汪洋",
    Icon: BookOpen,
    objectAlt: "綠色封面的《銀河便車指南》",
    persona: "幽默、待人和善，內心藏著一個四次元的跳脫世界。",
    roomDesc:
      "幽暗的藍色水波紋在牆上晃動。桌上堆滿公職試題，旁邊整齊疊著一排畫滿小角色的品客罐，最深處壓著一本翻到爛掉的《銀河便車指南》。",
    cores: ["創作獨特性 vs AI 取代", "家庭期待 vs 荒謬浪漫", "大腦清楚但心理混亂"],
    quote: "我們為什麼一定要在出發以前，就知道自己要去哪裡？",
    lostLine: "用文字證明自己，卻擔心被取代", // 「看看其他租客」卡片上的一句話迷惘點
    monologue:
      "你其實很清楚別人希望你走哪一條路，只是心裡還有一個聲音，不肯就這樣安靜下來。也許那份說不出口的不甘心，正是你最像自己的地方。",
    clues: [
      "在父母寄來的公職試題與實習簡章最深處，翻出那本被壓住的《銀河便車指南》。",
      "看看書桌旁那排品客罐——上面畫滿了烏龜、水母，和一雙雙厭世的 Marvin 眼睛。",
      "打開他的電腦，替小說《航向大霧的觀察員》選一個結局。",
    ],
    hashtags: ["#小說異世界vs現實生活", "#作家能當飯吃嗎", "#寫作"], // 依《角色介紹》：迷惘的點、興趣、個性
    theme: {
      // 若失公寓標準色・綠：#589D74
      text: "text-[#589D74]",
      hex: "#589D74", // 限動圖片用的角色色
      border: "border-[#589D74]/45",
      bar: "bg-[#589D74]",
      btn: "bg-[#589D74] text-white hover:brightness-110",
      // 按鈕、圖示等互動介面
      hoverBorder: "hover:border-[#589D74]/70",
      iconBg: "bg-[#589D74]/15 text-[#589D74]",
    },
  },
  yuting: {
    key: "yuting",
    name: "陳宇廷",
    en: "Yu-Ting",
    dept: "資工系・大四",
    room: "203",
    roomName: "陳宇廷的代碼迷宮",
    Icon: Gamepad2,
    objectAlt: "藍色遊戲握把",
    persona: "陽光外向、愛玩遊戲與吉他，是朋友眼中最好相處的人。",
    roomDesc:
      "書桌被一條看不見的線分成兩半：一邊是冰冷整齊的資工教科書與成績單，一邊是混亂熱血的遊戲草圖與吉他 Pick。抽屜裡，有個被雜線纏住的微光木盒。",
    cores: ["被動滿足期待 vs 真正熱愛", "大廠高薪 vs 獨立遊戲夢想", "在別人的評價系統拿高分卻窒息"],
    quote: "也許一無所有、也許失敗，但至少這是我的選擇。",
    lostLine: "一路拿高分，卻在別人的評分表裡喘不過氣", // 「看看其他租客」卡片上的一句話迷惘點
    monologue:
      "你一直很努力，也一直做得不錯。只是每過一關，你就越不確定，這場遊戲是不是自己想玩的。",
    clues: [
      "解開纏繞在微光木盒上的網路線與耳機線，看著暖光一點一點亮起來。",
      "拿起吉他 Pick，刮開卡片上銀灰色的「科技外衣」。",
      "戴上床上的耳機聽他的深夜獨白，再幫他把 offer 投進門口的小信箱。",
    ],
    hashtags: ["#做遊戲", "#很多朋友", "#陽光外向好相處", "#家人的期待不是自己想做的"], // 依《角色介紹》：迷惘的點、興趣、個性
    theme: {
      // 若失公寓標準色・藍：#0086B6
      text: "text-[#0086B6]",
      hex: "#0086B6", // 限動圖片用的角色色
      border: "border-[#0086B6]/45",
      bar: "bg-[#0086B6]",
      btn: "bg-[#0086B6] text-white hover:brightness-110",
      // 按鈕、圖示等互動介面
      hoverBorder: "hover:border-[#0086B6]/70",
      iconBg: "bg-[#0086B6]/15 text-[#0086B6]",
    },
  },
  siyu: {
    key: "siyu",
    name: "王思予",
    en: "Si-Yu",
    dept: "財金系・大三升大四",
    room: "102",
    roomName: "王思予的探索日記",
    Icon: NotebookPen,
    objectAlt: "攤開的手帳",
    persona: "內斂沉穩、擅長傾聽，把想法和情緒都寫進日記裡。",
    roomDesc:
      "房間乾淨素雅，四處貼滿便利貼。桌上兩本手帳：一本寫滿 To-Do，一本開始記錄感受。還有一座三層衣櫃，掛著休閒服、西裝和營服。",
    cores: ["冒牌者症候群", "主流菁英賽道 vs 尋求社會意義", "以為把事做好就有正解，其實沒有標準答案"],
    quote: "我還是不知道自己想要什麼，但就繼續探索玩耍吧！",
    lostLine: "把每件事都做好，卻不知道自己想成為誰", // 「看看其他租客」卡片上的一句話迷惘點
    monologue:
      "你把每件事都做得很好，卻還是說不出自己想成為什麼樣的人。那一頁還沒有答案的空白，也值得好好留著。",
    clues: [
      "翻開兩本手帳，看她怎麼從「管理自己」慢慢走到「理解自己」。",
      "拉開三層衣櫃，大一的秋、大二的冬、大三的春，三種光在等你。",
      "床上那隻娃娃的拉鍊裡，藏著她狀況不好時的陪伴。",
    ],
    hashtags: ["#做少數的自決", "#聽中文歌", "#內斂安靜"], // 依《角色介紹》：迷惘的點、興趣、個性
    theme: {
      // 若失公寓標準色・橘：#FFA634
      text: "text-[#FFA634]",
      hex: "#FFA634", // 限動圖片用的角色色
      border: "border-[#FFA634]/45",
      bar: "bg-[#FFA634]",
      btn: "bg-[#FFA634] text-[#1E1E24] hover:brightness-110",
      // 按鈕、圖示等互動介面
      hoverBorder: "hover:border-[#FFA634]/70",
      iconBg: "bg-[#FFA634]/15 text-[#FFA634]",
    },
  },
  muwei: {
    key: "muwei",
    name: "許沐微",
    en: "Mu-Wei",
    dept: "傳科系・大四",
    room: "404",
    roomName: "許沐微的內心紀錄",
    Icon: Camera,
    objectAlt: "紅色底片相機",
    persona: "慢熟的文青，熱愛自然與攝影，努力想融入大群體。",
    roomDesc:
      "花草植栽從天花板垂下，溫暖的串燈繞著原木書桌。牆上貼滿拍立得與合照，底片相機安靜地躺在櫃子下——好久沒有人碰它了。",
    cores: ["社群焦慮 FOMO", "討好融入群體 vs 忠於慢熟本質", "學業滿分 vs 擱置已久的攝影初心"],
    quote: "忙忙碌碌地做了很多事，但⋯我為什麼要做呢？",
    lostLine: "努力融入群體，卻好久沒按下自己的快門", // 「看看其他租客」卡片上的一句話迷惘點
    monologue:
      "你很努力跟上身邊的節奏，忙著回應、忙著參與，卻好久沒有停下來問問自己。慢一點也沒關係。",
    clues: [
      "替書桌旁的盆栽澆一點水，照顧好植物，也照顧好自己。",
      "把地毯上撕碎的紙片拼回去，那是她試著寫給自己的話。",
      "找到床底下的高中回憶盒，裡面壓著一張她早已寫好答案的學習單。",
    ],
    hashtags: ["#在意他人的眼光", "#努力融入大群體", "#攝影", "#慢熱內向"], // 依《角色介紹》：迷惘的點、興趣、個性
    theme: {
      // 若失公寓標準色・紅：#C84658
      text: "text-[#C84658]",
      hex: "#C84658", // 限動圖片用的角色色
      border: "border-[#C84658]/45",
      bar: "bg-[#C84658]",
      btn: "bg-[#C84658] text-white hover:brightness-110",
      // 按鈕、圖示等互動介面
      hoverBorder: "hover:border-[#C84658]/70",
      iconBg: "bg-[#C84658]/15 text-[#C84658]",
    },
  },
};

const ORDER = ["ian", "yuting", "siyu", "muwei"];

// Hashtag 依字數由短到長排列，最長的放最後，換行時比較平衡
const sortedTags = (tags) => [...tags].sort((a, b) => Array.from(a).length - Array.from(b).length);

// ---------- 題庫（嚴格依照企劃） ----------
const QUESTIONS = [
  {
    id: "q1",
    scene: "深夜",
    text: "已經凌晨 2:00 了，你想做什麼？",
    options: [
      { label: "A", text: "繼續滑限動", char: "muwei" },
      { label: "B", text: "來看點小說吧", char: "ian" },
      { label: "C", text: "有時間就繼續找職缺", char: "siyu" },
      { label: "D", text: "看看之前出去玩的照片", char: "yuting" },
    ],
  },
  {
    id: "q2",
    scene: "", // 這題刻意留白
    text: "如果眼前有一本完全空白的手帳本，你想？",
    options: [
      { label: "A", text: "填滿代辦事項的每一格", char: "siyu" },
      { label: "B", text: "在空白處想寫什麼就寫上", char: "ian" },
      { label: "C", text: "當日記記錄自己每天的心情", char: "yuting" },
      { label: "D", text: "放著，繼續滑手機", char: "muwei" },
    ],
  },
  {
    id: "q3",
    scene: "主流",
    text: "當大家都在朝同一個主流方向前進、並對你說「你應該也要這樣做」時，你會？",
    options: [
      { label: "A", text: "表面笑著接受，卻也思考自己真正喜歡什麼", char: "yuting" },
      { label: "B", text: "繼續聽但面無表情，心裡有點想反駁", char: "ian" },
      { label: "C", text: "雖然照著主流走，但心裡清楚這不是自己要的", char: "siyu" },
      { label: "D", text: "會害怕成為不合群的人，就跟大家一起吧", char: "muwei" },
    ],
  },
  {
    id: "q4",
    scene: "門簾",
    text: "拉開若失公寓的門簾，你第一個想拿起來看的是？",
    options: [
      { label: "A", text: "一個磨損的吉他 Pick", char: "yuting" },
      { label: "B", text: "桌上被壓在講義下的英文小說", char: "ian" },
      { label: "C", text: "貼滿筆記、寫滿的手帳本", char: "siyu" },
      { label: "D", text: "夾在溫暖串燈上的生活照片", char: "muwei" },
    ],
  },
  {
    id: "q5",
    scene: "離開之前",
    text: "離開若失公寓之前，聽到哪句話最有共鳴？",
    options: [
      { label: "A", text: "「探索本身就是答案，沒有標準解答也沒關係。」", char: "siyu" },
      { label: "B", text: "「這是我自己做的，不需要在別人的規則裡證明自己。」", char: "yuting" },
      { label: "C", text: "「這種『不知道』的迷惘，正是我無法被取代的證明。」", char: "ian" },
      { label: "D", text: "「不用急著成為耀眼的人，大大方方做自己就好。」", char: "muwei" },
    ],
  },
];

// 每句拆成兩段：手機版在逗號後整段換行，不會只剩一兩個字掉到下一行
const CLOSING_LINES = [
  ["心神不定的時候，好像丟了什麼，", "卻也好像正要生出新的自己。"],
  ["這裡的每個房間，", "都只是某個時空裡正在尋找答案的切片。"],
];

// ---------- 計分：最高分者勝，平手隨機 ----------
function tallyScores(answers) {
  const scores = { ian: 0, yuting: 0, siyu: 0, muwei: 0 };
  answers.forEach((c) => {
    if (c && scores[c] !== undefined) scores[c] += 1;
  });
  return scores;
}

function pickResult(scores) {
  const max = Math.max(...ORDER.map((k) => scores[k]));
  const tied = ORDER.filter((k) => scores[k] === max);
  return tied[Math.floor(Math.random() * tied.length)];
}

// ---------- 剪貼簿（含舊瀏覽器 fallback） ----------
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (_) {
    /* fall through */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch (_) {
    return false;
  }
}

// ---------- 動畫樣式 ----------
const GlobalStyles = () => (
  <style>{`
    @import url("https://fonts.googleapis.com/css2?family=Huninn&display=swap");
    ${fontFaceCss}
    .la-root { -webkit-tap-highlight-color: transparent; }
    /* 滑鼠游標換成織蛛（只在有滑鼠的電腦上；輸入框保留打字游標） */
    @media (hover: hover) and (pointer: fine) {
      .la-root, .la-root * {
        cursor: url(${ASSETS.cursor32}) 16 16, auto;
        cursor: -webkit-image-set(url(${ASSETS.cursor32}) 1x, url(${ASSETS.cursor64}) 2x) 16 16, auto;
      }
      .la-root input { cursor: text; }
      /* 滑鼠移動後改用會動的織蛛游標（見 SpiderCursor），系統游標隱藏 */
      .la-cursor-on .la-root, .la-cursor-on .la-root * { cursor: none; }
      .la-cursor-on .la-root input { cursor: text; }
    }
    @keyframes la-wiggle {
      0% { transform: rotate(0) scale(1); }
      20% { transform: rotate(-18deg) scale(0.88); }
      45% { transform: rotate(14deg) scale(1.05); }
      70% { transform: rotate(-7deg) scale(1); }
      100% { transform: rotate(0) scale(1); }
    }
    .la-wiggle { animation: la-wiggle .45s ease-out; }
    .la-root button, .la-root a { touch-action: manipulation; }
    .la-root, .la-root input, .la-root button { font-family: "LA Huninn", "Huninn", "PingFang TC", "Microsoft JhengHei", sans-serif; }
    @keyframes la-bob { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-6px) rotate(2deg); } }
    @keyframes la-dangle { 0%,100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
    .la-bob { animation: la-bob 3.2s ease-in-out infinite; }
    .la-dangle { animation: la-dangle 4s ease-in-out infinite; transform-origin: top center; }
    @keyframes la-fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
    @keyframes la-fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes la-float { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(24px,-32px) scale(1.08); } }
    @keyframes la-float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-28px,22px) scale(0.95); } }
    @keyframes la-flicker { 0%,100% { opacity: .95; } 42% { opacity: .55; } 46% { opacity: .9; } 70% { opacity: .75; } }
    @keyframes la-ripple { 0% { transform: scale(.4); opacity: .55; } 100% { transform: scale(2.2); opacity: 0; } }
    @keyframes la-twinkle { 0%,100% { opacity: .15; } 50% { opacity: .8; } }
    @keyframes la-door { 0% { transform: perspective(600px) rotateY(0deg); } 100% { transform: perspective(600px) rotateY(-38deg); } }
    .la-fade-up { animation: la-fadeUp .65s cubic-bezier(.2,.7,.2,1) both; }
    .la-fade-in { animation: la-fadeIn .5s ease both; }
    .la-float { animation: la-float 14s ease-in-out infinite; }
    .la-float2 { animation: la-float2 18s ease-in-out infinite; }
    .la-flicker { animation: la-flicker 4.5s ease-in-out infinite; }
    .la-ripple { animation: la-ripple 3.6s ease-out infinite; }
    .la-twinkle { animation: la-twinkle 3s ease-in-out infinite; }
    .la-door { animation: la-door 1.2s cubic-bezier(.5,0,.2,1) both; transform-origin: left center; }
    @media (prefers-reduced-motion: reduce) {
      .la-fade-up, .la-fade-in, .la-float, .la-float2, .la-flicker, .la-ripple, .la-twinkle, .la-door, .la-bob, .la-dangle { animation: none !important; }
    }
  `}</style>
);

// ---------- 外部連結（募資網址上架後填入 crowdfunding 即可，留空會顯示「即將上架」） ----------
// 實體展覽
const EVENT = {
  name: "若失公寓",
  dates: "11/14（六）、11/15（日）",
  place: "陽明交大光復校區 人社三館 201 室",
};

const LINKS = {
  crowdfunding: "",
  instagram: "https://www.instagram.com/lost.apt/",
};

// ---------- 聲音 ----------
// 預設由瀏覽器即時合成（Web Audio API），不需要任何音檔。
// 若之後有正式配樂，把網址填進來即可改用音檔循環播放：calm = 玄關／結算，mystery = 測驗中
const AUDIO_FILES = {
  calm: null, // 例："./assets/audio/calm.mp3"
  mystery: null, // 例："./assets/audio/mystery.mp3"
};

// 0.1 秒的無聲音檔：iPhone 開著靜音鍵時，網頁合成的聲音預設會被靜音；
// 同時播放一段 <audio> 能讓聲音照常出來（iOS 的音訊工作階段改為「播放」模式）。
const SILENT_WAV = "data:audio/wav;base64,UklGRkQDAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSADAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA==";

const midiHz = (m) => 440 * Math.pow(2, (m - 69) / 12);

function createAudioEngine() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  const ctx = new AC();
  const master = ctx.createGain();
  master.gain.value = 0.8;
  master.connect(ctx.destination);

  // 共用的空間感：回授延遲當作簡易殘響
  const makeSpace = (time, feedback, tone) => {
    const input = ctx.createGain();
    const delay = ctx.createDelay(2);
    delay.delayTime.value = time;
    const fb = ctx.createGain();
    fb.gain.value = feedback;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = tone;
    input.connect(delay);
    delay.connect(lp);
    lp.connect(fb);
    fb.connect(delay);
    return { input, output: lp };
  };

  const noiseBuffer = (() => {
    const b = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  })();

  // 單音：attack / decay 包絡
  const tone = (dest, freq, { type = "sine", at = ctx.currentTime, attack = 0.01, decay = 1.2, peak = 0.1, detune = 0 } = {}) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    o.detune.value = detune;
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(peak, at + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, at + attack + decay);
    o.connect(g);
    g.connect(dest);
    o.start(at);
    o.stop(at + attack + decay + 0.05);
  };

  const bell = (dest, freq, at, peak = 0.06, decay = 3) => {
    tone(dest, freq, { at, peak, decay, attack: 0.005 });
    tone(dest, freq * 2.76, { at, peak: peak * 0.25, decay: decay * 0.4, attack: 0.005 });
    tone(dest, freq * 5.4, { at, peak: peak * 0.08, decay: decay * 0.2, attack: 0.005 });
  };

  // ---- 無限循環的排程器 ----
  // 依音訊時鐘（ctx.currentTime）提前排好下一段，不靠一環扣一環的 setTimeout，
  // 所以不會因為計時器被瀏覽器延遲而中斷；分頁暫停後回來也會從「現在」接著播。
  const loop = (period, fn, startDelay = 0.1) => {
    let next = ctx.currentTime + startDelay;
    let i = 0;
    const tick = () => {
      if (next < ctx.currentTime - period) next = ctx.currentTime + 0.05; // 長時間暫停後重新對齊
      while (next < ctx.currentTime + 1.2) {
        fn(next, i);
        i += 1;
        next += period;
      }
    };
    tick();
    const id = setInterval(tick, 300);
    return () => clearInterval(id);
  };

  // 柔和的和弦鋪底：每個音由正弦＋三角波疊成，慢慢浮現、慢慢消失
  const padChord = (dest, notes, at, len, level) => {
    notes.forEach((m) => {
      [-5, 5].forEach((cents) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = cents < 0 ? "sine" : "triangle";
        o.frequency.value = midiHz(m);
        o.detune.value = cents;
        g.gain.setValueAtTime(0.0001, at);
        g.gain.exponentialRampToValueAtTime(level, at + 3);
        g.gain.setValueAtTime(level, at + len - 0.5);
        g.gain.exponentialRampToValueAtTime(0.0001, at + len + 3);
        o.connect(g);
        g.connect(dest);
        o.start(at);
        o.stop(at + len + 3.2);
      });
    });
  };

  // ---- 背景音樂：平靜（玄關、結算）— 無限循環 ----
  const startCalm = (bus) => {
    const space = makeSpace(0.48, 0.38, 2400);
    space.output.connect(bus);
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = "lowpass";
    padFilter.frequency.value = 1100;
    padFilter.connect(bus);
    padFilter.connect(space.input);

    const chords = [
      [48, 55, 64, 71], // Cmaj7
      [45, 52, 60, 67], // Am7
      [41, 48, 57, 64], // Fmaj7
      [43, 50, 59, 62], // G
    ];
    const melody = [72, 74, 76, 79, 81, 84, 79, 76];
    const BAR = 7.5;
    return loop(BAR, (at, bar) => {
      padChord(padFilter, chords.at(bar % chords.length), at, BAR, 0.022);
      const notes = 2 + (bar % 2); // 每小節 2–3 個音樂盒音
      for (let i = 0; i < notes; i++) {
        const m = melody.at((bar * 3 + i * 2) % melody.length);
        bell(space.input, midiHz(m), at + 1.2 + i * 2.1, 0.035, 2.6);
      }
    });
  };

  // ---- 背景音樂：神秘、沉澱（測驗中）— 輕盈版，無限循環 ----
  // 不再使用低音鋸齒波與超低頻；改用懸浮的 sus／maj7 和弦、D 多利安音階的鐘聲與很輕的夜風，
  // 保留一點未知感，但不壓迫。
  const startMystery = (bus) => {
    const nodes = [];
    const space = makeSpace(0.55, 0.42, 2200);
    space.output.connect(bus);
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = "lowpass";
    padFilter.frequency.value = 1300;
    padFilter.connect(bus);
    padFilter.connect(space.input);

    // 很輕的夜風：偏高頻的帶通雜訊
    const wind = ctx.createBufferSource();
    wind.buffer = noiseBuffer;
    wind.loop = true;
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = "bandpass";
    windFilter.frequency.value = 1400;
    windFilter.Q.value = 0.6;
    const windLfo = ctx.createOscillator();
    const windLfoGain = ctx.createGain();
    windLfo.frequency.value = 0.08;
    windLfoGain.gain.value = 500;
    windLfo.connect(windLfoGain);
    windLfoGain.connect(windFilter.frequency);
    const windGain = ctx.createGain();
    windGain.gain.value = 0.005;
    wind.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(bus);
    wind.start();
    windLfo.start();
    nodes.push(wind, windLfo);

    const chords = [
      [50, 57, 62, 64, 69], // Dsus2（懸而未決）
      [46, 53, 57, 62, 69], // Bbmaj9
      [43, 50, 57, 62, 65], // Gm9
      [45, 52, 57, 62, 64], // Asus4
    ];
    const scale = [74, 76, 77, 81, 83, 86, 81, 77]; // D 多利安：帶一點謎，但不陰暗
    const BAR = 8;
    const stopLoop = loop(BAR, (at, bar) => {
      padChord(padFilter, chords.at(bar % chords.length), at, BAR, 0.016);
      for (let i = 0; i < 3; i++) {
        const m = scale.at((bar * 3 + i * 3) % scale.length);
        bell(space.input, midiHz(m), at + 0.8 + i * 2.3, 0.03, 3.2);
      }
    });

    return () => {
      stopLoop();
      const end = ctx.currentTime + 2.6;
      nodes.forEach((n) => {
        try {
          n.stop(end);
        } catch (_) {
          /* already stopped */
        }
      });
    };
  };

  const SYNTHS = { calm: startCalm, mystery: startMystery };

  let current = null; // { name, bus, stop }
  const playBgm = (name) => {
    if (current && current.name === name) return;
    const prev = current;
    if (prev) {
      const t = ctx.currentTime;
      prev.bus.gain.cancelScheduledValues(t);
      prev.bus.gain.setValueAtTime(prev.bus.gain.value, t);
      prev.bus.gain.linearRampToValueAtTime(0, t + 2.2);
      setTimeout(() => {
        prev.stop();
        prev.bus.disconnect();
      }, 2500);
    }
    if (!name) {
      current = null;
      return;
    }
    const bus = ctx.createGain();
    bus.gain.setValueAtTime(0, ctx.currentTime);
    bus.gain.linearRampToValueAtTime(1, ctx.currentTime + 3);
    bus.connect(master);
    let stop;
    const file = AUDIO_FILES[name];
    if (file) {
      const el = new Audio(file);
      el.loop = true;
      el.crossOrigin = "anonymous";
      const src = ctx.createMediaElementSource(el);
      src.connect(bus);
      el.play().catch(() => {});
      stop = () => {
        el.pause();
        src.disconnect();
      };
    } else {
      stop = SYNTHS[name](bus);
    }
    current = { name, bus, stop };
  };

  // ---- 音效 ----
  const sfxBus = ctx.createGain();
  sfxBus.gain.value = 0.9;
  sfxBus.connect(master);
  const sfxSpace = makeSpace(0.22, 0.25, 3000);
  sfxSpace.output.connect(sfxBus);

  // 嘎吱聲的波形：一連串快速、不規則的摩擦脈衝，每個脈衝是一小段衰減的共振
  let creakCache = null;
  const creakBuffer = () => {
    if (creakCache) return creakCache;
    const sr = ctx.sampleRate;
    const dur = 1.0;
    const b = ctx.createBuffer(1, Math.floor(sr * dur), sr);
    const d = b.getChannelData(0);
    let phase = 0;
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < d.length; i++) {
      const x = i / d.length; // 0 → 1：門從半開到全開
      const rate = 38 + 34 * Math.sin(Math.PI * x) + 10 * Math.sin(x * 23); // 每秒脈衝數，先變快再變慢
      phase += rate / sr;
      if (phase >= 1) {
        phase -= 1;
        const amp = (0.6 + 0.4 * rnd()) * Math.sin(Math.PI * Math.min(1, x * 1.15)); // 頭尾淡入淡出
        const f = 650 + 500 * x + 120 * rnd();
        const len = Math.floor(sr * 0.012);
        for (let k = 0; k < len && i + k < d.length; k++) {
          d[i + k] += amp * Math.exp(-k / (sr * 0.0025)) * Math.sin((2 * Math.PI * f * k) / sr);
        }
      }
    }
    creakCache = b;
    return b;
  };

  // 暫時壓低背景音樂（音效出現時）
  const duck = (seconds) => {
    if (!current) return;
    const g = current.bus.gain;
    const t = ctx.currentTime;
    g.cancelScheduledValues(t);
    g.setValueAtTime(g.value, t);
    g.linearRampToValueAtTime(0.3, t + 0.15);
    g.setValueAtTime(0.3, t + seconds);
    g.linearRampToValueAtTime(1, t + seconds + 1.2);
  };

  const sfx = {
    // 選擇答案：輕柔的雙音撥弦
    select() {
      const t = ctx.currentTime;
      tone(sfxBus, midiHz(79), { at: t, type: "triangle", peak: 0.08, decay: 0.35 });
      tone(sfxSpace.input, midiHz(86), { at: t + 0.07, type: "sine", peak: 0.05, decay: 0.5 });
    },
    // 上一題：較低的單音
    back() {
      tone(sfxBus, midiHz(67), { type: "triangle", peak: 0.06, decay: 0.3 });
    },
    // 一般點擊
    tap() {
      tone(sfxBus, midiHz(84), { type: "sine", peak: 0.04, decay: 0.15 });
    },
    // 領取鑰匙：金屬鑰匙串
    key() {
      const t = ctx.currentTime;
      [91, 96, 100, 103].forEach((m, i) => bell(sfxSpace.input, midiHz(m), t + i * 0.06, 0.035, 0.6));
      const n = ctx.createBufferSource();
      n.buffer = noiseBuffer;
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 5000;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.03, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      n.connect(hp);
      hp.connect(g);
      g.connect(sfxBus);
      n.start(t);
      n.stop(t + 0.3);
    },
    // 開門：對應三張門口插畫（0 秒關門 → 0.5 秒半開 → 1.05 秒全開）
    // 門把喀噠兩聲 → 木門鉸鏈「咿——」的嘎吱聲 → 門打開時湧進來的一陣風
    door() {
      const t = ctx.currentTime;
      duck(2.2); // 先把背景音樂壓低，讓開門聲聽得清楚

      // 1. 門把／門鎖：兩聲短促的喀噠
      [0.05, 0.17].forEach((dt, k) => {
        const n = ctx.createBufferSource();
        n.buffer = noiseBuffer;
        const hp = ctx.createBiquadFilter();
        hp.type = "bandpass";
        hp.frequency.value = k ? 2600 : 1900;
        hp.Q.value = 3;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t + dt);
        g.gain.exponentialRampToValueAtTime(0.35, t + dt + 0.003);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dt + 0.05);
        n.connect(hp);
        hp.connect(g);
        g.connect(sfxBus);
        n.start(t + dt, Math.random());
        n.stop(t + dt + 0.08);
        tone(sfxBus, k ? 1450 : 1150, { at: t + dt, type: "triangle", peak: 0.05, decay: 0.08, attack: 0.002 });
      });

      // 2. 鉸鏈嘎吱聲：用「黏滑摩擦」的脈衝串做出咿呀聲，音高隨門慢慢打開而變化
      const creak = creakBuffer();
      const src = ctx.createBufferSource();
      src.buffer = creak;
      const body = ctx.createBiquadFilter();
      body.type = "bandpass";
      body.frequency.value = 900;
      body.Q.value = 4;
      const body2 = ctx.createBiquadFilter();
      body2.type = "peaking";
      body2.frequency.value = 2200;
      body2.gain.value = 6;
      const cg = ctx.createGain();
      cg.gain.value = 0.55;
      src.connect(body);
      body.connect(body2);
      body2.connect(cg);
      cg.connect(sfxBus);
      cg.connect(sfxSpace.input);
      src.start(t + 0.32);

      // 3. 門打開：一陣柔和的風聲，迎向結算畫面
      const air = ctx.createBufferSource();
      air.buffer = noiseBuffer;
      air.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.setValueAtTime(250, t + 0.9);
      lp.frequency.exponentialRampToValueAtTime(1600, t + 1.5);
      const ag = ctx.createGain();
      ag.gain.setValueAtTime(0.0001, t + 0.9);
      ag.gain.exponentialRampToValueAtTime(0.06, t + 1.25);
      ag.gain.exponentialRampToValueAtTime(0.0001, t + 2.1);
      air.connect(lp);
      lp.connect(ag);
      ag.connect(sfxBus);
      air.start(t + 0.9);
      air.stop(t + 2.2);
    },
    // 揭曉結果：上行的鐘聲琶音
    reveal() {
      const t = ctx.currentTime;
      [72, 76, 79, 84, 88].forEach((m, i) => bell(sfxSpace.input, midiHz(m), t + i * 0.11, 0.05, 2.2));
    },
  };

  const setMuted = (muted) => {
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(muted ? 0 : 0.8, t + 0.4);
  };

  // ---- iPhone 靜音鍵處理 ----
  let keepAlive = null;
  const wakeIOS = () => {
    try {
      if (navigator.audioSession) navigator.audioSession.type = "playback"; // Safari 17+
    } catch (_) {
      /* not supported */
    }
    if (!keepAlive) {
      keepAlive = new Audio(SILENT_WAV);
      keepAlive.loop = true;
      keepAlive.setAttribute("playsinline", "");
    }
    const p = keepAlive.play();
    if (p && p.catch) p.catch(() => {});
  };
  const sleepIOS = () => {
    if (keepAlive) keepAlive.pause();
  };

  return { ctx, playBgm, sfx, setMuted, wakeIOS, sleepIOS };
}

// ---------- 聲音開關 ----------
// ---------- 滑鼠游標：織蛛（點擊時晃一下） ----------
// 系統游標無法做動畫，所以在有滑鼠的電腦上改用一個跟著滑鼠走的小圖；
// 手機、平板（沒有滑鼠）完全不會出現。
function SpiderCursor() {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let shown = false;
    const show = (v) => {
      if (shown === v) return;
      shown = v;
      setOn(v);
      document.documentElement.classList.toggle("la-cursor-on", v);
    };
    const move = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const el = wrapRef.current;
      if (el) el.style.transform = `translate3d(${e.clientX - 17}px, ${e.clientY - 17}px, 0)`;
      // 在輸入框上改回打字游標
      const overInput = e.target && e.target.closest && e.target.closest("input, textarea");
      if (el) el.style.opacity = overInput ? "0" : "1";
      show(true);
    };
    const down = (e) => {
      if (reduce || (e.pointerType && e.pointerType !== "mouse")) return;
      const im = imgRef.current;
      if (!im) return;
      im.classList.remove("la-wiggle");
      void im.offsetWidth; // 重新觸發動畫
      im.classList.add("la-wiggle");
    };
    const leave = () => show(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("la-cursor-on");
    };
  }, []);
  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ display: on ? "block" : "none", willChange: "transform" }}
    >
      <img ref={imgRef} src={ASSETS.cursor64} alt="" width="34" height="34" className="h-[34px] w-[34px] select-none" draggable="false" />
    </div>
  );
}

function SoundToggle({ on, unlocked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={on ? "關閉聲音" : "開啟聲音"}
      aria-pressed={on}
      style={{ top: "max(1rem, env(safe-area-inset-top))", right: "max(1rem, env(safe-area-inset-right))" }}
      className="fixed z-40 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/70 px-3 py-2 text-xs text-zinc-300 backdrop-blur transition hover:border-white/25 hover:text-white"
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      {!unlocked && on && <span>輕觸開啟聲音</span>}
    </button>
  );
}

// ---------- 背景：社群背景圖（深夜格線與星點） ----------

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* 主視覺「社群背景圖」：格線、手繪星號與彩色微光點（不加任何漸層） */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ASSETS.bgChalk})` }} />
    </div>
  );
}

// ---------- 階段一：入住邀請與玄關 ----------
function Landing({ nickname, setNickname, onStart }) {
  const [tried, setTried] = useState(false);
  const inputRef = useRef(null);
  const ready = nickname.trim().length > 0;
  const submit = () => {
    if (!ready) {
      setTried(true);
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    onStart();
  };
  return (
    <section className="la-fade-up flex min-h-[85vh] flex-col justify-center pt-12 sm:pt-0 lg:grid lg:min-h-[88vh] lg:grid-cols-2 lg:content-center lg:items-center lg:gap-x-16 lg:gap-y-4">
      {/* 主視覺：電腦版橫跨兩欄、放大置中 */}
      <h1 className="-mx-5 sm:-mx-8 lg:col-span-2 lg:mx-auto lg:w-full lg:-mt-6 lg:max-w-[min(60rem,105vh)]">
        <img
          src={ASSETS.wordmarkWeb}
          alt="若失公寓"
          width="1200"
          height="522"
          className="la-flicker block h-auto w-full select-none"
          draggable="false"
        />
        <span className="mt-1 block text-center text-sm font-normal tracking-[0.45em] text-zinc-400 lg:text-base">LOST Apartment</span>
      </h1>

      {/* 左欄（手機上在上方）：標題與引言 */}
      <div>

      <p className="mt-8 flex justify-center lg:mt-0 lg:justify-start">
        <span className="rounded-full border border-[#EDF1EC]/25 bg-zinc-900/50 px-4 py-1.5 text-xs tracking-widest text-zinc-300 backdrop-blur lg:text-sm">
          {EVENT.name}前導小遊戲
        </span>
      </p>

      <h2 className="mt-5 text-center text-[1.75rem] font-bold leading-snug tracking-wide text-[#EDF1EC] sm:text-4xl lg:mt-6 lg:text-left lg:text-5xl lg:leading-tight xl:text-6xl xl:leading-tight">
        你正經歷哪種<br className="hidden lg:inline" />「不知道」？
      </h2>

      {/* 世界觀：和 IG 貼文同一套說法 */}
      <div className="mt-8 space-y-4 text-center text-lg leading-loose text-zinc-200 lg:text-left lg:text-xl lg:leading-loose">
        <p>
          這裡曾經入住 4 位租客，
          <br />
          然而，只有在迷惘狀態的人才能進入。
        </p>
        <p>
          他們都經歷了什麼？為什麼離開了？
          <br />
          等待新室友的你，揭開謎題⋯⋯
        </p>
      </div>
      </div>

      {/* 不使用 <form>：在預覽視窗（沙盒 iframe）裡表單送出會被瀏覽器擋下，按鈕會沒反應 */}
      {/* 右欄（手機上在下方）：輸入暱稱 */}
      <div className="mt-10 space-y-4 lg:mt-0 lg:rounded-3xl lg:border lg:border-white/10 lg:bg-zinc-900/40 lg:p-10 lg:backdrop-blur">
        <div className="flex items-end gap-3">
          <img
            src={ASSETS.spiderYarn}
            alt=""
            width="360"
            height="356"
            className="la-bob h-16 w-16 shrink-0 select-none object-contain lg:h-24 lg:w-24"
            draggable="false"
          />
          <label htmlFor="nickname" className="mb-1 block text-sm leading-relaxed text-zinc-400 lg:text-base">
            <span className="block text-xs tracking-widest text-zinc-500">公寓管理員・織蛛</span>
            新室友，該怎麼稱呼你？
          </label>
        </div>
        <input
          id="nickname"
          ref={inputRef}
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            if (e.target.value.trim()) setTried(false);
          }}
          required
          aria-invalid={tried && !ready}
          aria-describedby="nickname-hint"
          maxLength={12}
          placeholder="輸入你的暱稱"
          autoComplete="off"
          enterKeyHint="go"
          onKeyDown={(e) => {
            // 注音／拼音選字時按 Enter 是確認候選字，不能當成送出
            if (e.key !== "Enter" || e.nativeEvent.isComposing || e.keyCode === 229) return;
            e.preventDefault();
            submit();
          }}
          className={`w-full rounded-2xl border ${tried && !ready ? "border-[#C84658]/80" : "border-zinc-700/70"} bg-zinc-900/60 px-5 py-4 text-lg text-zinc-100 placeholder-zinc-600 outline-none backdrop-blur transition focus:border-[#EDF1EC]/50 focus:ring-2 focus:ring-[#EDF1EC]/20`}
        />
        {/* 平常不顯示；沒填就按按鈕時才出現紅色 ＊ 提醒 */}
        <p id="nickname-hint" aria-live="polite" className={tried && !ready ? "-mt-1 flex items-center gap-1 pl-1 text-sm text-[#C84658]" : "sr-only"}>
          {tried && !ready && (
            <>
              <span aria-hidden="true" className="text-base font-bold leading-none text-[#C84658]">*</span>
              請先填寫暱稱
            </>
          )}
        </p>
        <div className="relative">
        <button
          type="button"
          onClick={submit}
          aria-disabled={!ready}
          className={`group flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-lg font-medium transition active:scale-[0.99] ${
            ready
              ? "relative bg-[#EDF1EC] text-[#3A4358] hover:bg-white"
              : "relative bg-zinc-800/90 text-[#EDF1EC]/60"
          }`}
        >
          <DoorOpen className="h-5 w-5 transition group-hover:translate-x-0.5" />
          掀開門簾
        </button>
        </div>
      </div>
    </section>
  );
}

// ---------- 階段二：迷惘共振測驗 ----------
function Quiz({ name, qIndex, answers, onSelect, onBack, onNext, onSubmit, locked }) {
  const q = QUESTIONS[qIndex];
  const picked = answers[qIndex];
  // 回到前面的題目時，已經答過的題可以直接按「下一題」
  const canNext = Boolean(picked) && qIndex < QUESTIONS.length - 1 && !locked;
  const isLast = qIndex === QUESTIONS.length - 1;
  return (
    <section className="mx-auto flex min-h-[85vh] w-full max-w-3xl flex-col pt-4 lg:justify-center lg:gap-6 lg:pb-16 lg:pt-0">
      <header className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="group -ml-2 flex items-center gap-1.5 rounded-full px-2 py-1 text-sm text-zinc-500 transition hover:text-zinc-200"
          >
            <img
              src={ASSETS.spiderArrowLeft}
              alt=""
              width="160"
              height="188"
              className="h-8 w-8 select-none object-contain opacity-80 transition group-hover:-translate-x-0.5 group-hover:opacity-100"
              draggable="false"
            />
            {qIndex === 0 ? "回到玄關" : "上一題"}
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            className="group -mr-2 flex items-center gap-1.5 rounded-full px-2 py-1 text-sm text-zinc-500 transition hover:text-zinc-200 disabled:opacity-30 disabled:hover:text-zinc-500"
          >
            下一題
            <img
              src={ASSETS.spiderArrowRight}
              alt=""
              width="200"
              height="154"
              className="h-8 w-8 select-none object-contain opacity-80 transition group-hover:translate-x-0.5 group-hover:opacity-100 group-disabled:translate-x-0"
              draggable="false"
            />
          </button>
        </div>
        <div className="flex gap-1.5">
          {QUESTIONS.map((_, i) => (
            <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-800">
              <div
                className={`h-full rounded-full bg-[#EDF1EC]/85 transition-all duration-500 ${
                  i < qIndex || (i === qIndex && picked) ? "w-full" : i === qIndex ? "w-1/3" : "w-0"
                }`}
              />
            </div>
          ))}
        </div>
      </header>

      <div key={q.id} className="la-fade-up flex flex-1 flex-col lg:flex-none">
        <div className="mb-8 flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-medium leading-relaxed text-zinc-50 md:text-3xl md:leading-relaxed">{q.text}</h2>
          </div>
          <img
            src={ASSETS.spiderQuestion}
            alt=""
            width="280"
            height="223"
            className="la-bob mt-1 h-14 w-[4.4rem] shrink-0 select-none object-contain md:h-20 md:w-24"
            draggable="false"
          />
        </div>

        <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          {q.options.map((opt, i) => {
            const active = picked === opt.char;
            return (
              <button
                key={opt.label}
                type="button"
                disabled={locked}
                onClick={() => onSelect(opt.char)}
                style={{ animationDelay: `${0.08 * i + 0.1}s` }}
                className={`la-fade-up flex w-full items-start gap-4 rounded-2xl border px-5 py-4 text-left backdrop-blur transition active:scale-[0.99] md:min-h-[6rem] md:items-center md:px-6 md:py-5 ${
                  active
                    ? "border-[#EDF1EC]/60 bg-[#EDF1EC]/10 text-zinc-50"
                    : "border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/60"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm ${
                    active ? "border-[#EDF1EC] bg-[#EDF1EC] text-[#3A4358]" : "border-zinc-700 text-zinc-500"
                  }`}
                >
                  {active ? <Check className="h-4 w-4" /> : opt.label}
                </span>
                <span className="flex-1 text-base leading-relaxed md:text-lg">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* 最後一題：選完不直接跳結果，先讓玩家確認（還能改答案或回上一題） */}
        {isLast && (
          <div className="la-fade-up mt-8 space-y-3 md:mx-auto md:w-full md:max-w-md" style={{ animationDelay: "0.45s" }}>
            <button
              type="button"
              onClick={onSubmit}
              disabled={!picked || locked}
              aria-disabled={!picked || locked}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#EDF1EC] px-6 py-4 text-lg font-medium text-[#3A4358] transition hover:bg-white active:scale-[0.99] disabled:bg-zinc-800/90 disabled:text-[#EDF1EC]/50"
            >
              <DoorOpen className="h-5 w-5" />
              確認送出
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- 過場：開門 ----------
function Opening({ name, theme }) {
  // 門口插畫三格：關 → 半開 → 全開
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setFrame(1), 500);
    const t2 = setTimeout(() => setFrame(2), 1050);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    // 開門畫面盡量填滿整個螢幕：手機上圖佔上方約八成（保留招牌與門），電腦上整個畫面
    <section className="la-fade-in fixed inset-0 z-30 flex flex-col justify-center overflow-hidden bg-[#1E1E24]" aria-live="polite">
      {/* 手機：高度依螢幕寬度計算，讓整扇門完整、置中（不被裁到一邊）；電腦：鋪滿 */}
      <div className="relative h-[min(80vh,145vw)] w-full shrink-0 lg:absolute lg:inset-0 lg:h-full">
        {ASSETS.doors.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === 2 ? "若失公寓的門打開了" : ""}
            width="900"
            height="640"
            className={`absolute inset-0 h-full w-full select-none object-cover object-[48%_30%] transition-opacity duration-300 ${
              frame === i ? "opacity-100" : "opacity-0"
            }`}
            draggable="false"
          />
        ))}
        {/* 畫面邊緣微暗、底部漸漸融進背景，讓文字清楚 */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(9,9,11,0.45))]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1E1E24] to-transparent" />
      </div>
      {/* 手機：文字緊接在門的下方；電腦：疊在畫面下方 */}
      <div
        className="relative -mt-6 px-6 text-center lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0"
        style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
      >
        <p className="text-xl text-zinc-50 drop-shadow lg:text-2xl">進入若失公寓⋯⋯</p>
        <p className="mt-2 text-sm text-zinc-300 drop-shadow lg:text-base">正在為 {name} 尋找共鳴的房間</p>
      </div>
    </section>
  );
}

// ---------- 入住須知 ----------
// beforeStart：輸入暱稱、按「掀開門簾」後先讀入住須知，按「我知道了」才正式進入
function GuideModal({ open, onClose, onConfirm, beforeStart = false }) {
  const confirm = onConfirm || onClose;
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  const tips = [
    { Icon: Footprints, title: "進房前請脫鞋", body: "若失公寓是大家暫住的家，請在玄關脫鞋，輕輕走進來。" },
    { Icon: DoorOpen, title: "由管理員帶你入住若失公寓", body: "到了展場，公寓管理員會帶你推開大門，陪你走向第一個房間。" },
    { Icon: Compass, title: "只有迷惘中的人，才進得了別人的房間", body: "室友們暫時不在，而房裡的物件都可以探索，拿起來看一看、看到他們的迷惘點。" },
    {
      Icon: Leaf,
      title: "最後，入住你的新房間",
      body: "還有一間空房，而它會變成什麼樣子，交給你親手決定。",
    },
  ];
  return (
    <div className="la-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={beforeStart ? undefined : onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-title"
        onClick={(e) => e.stopPropagation()}
        className="la-fade-up max-h-[88vh] w-full max-w-md overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-950/95 p-6"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 id="guide-title" className="flex items-center gap-3 text-lg font-medium text-zinc-50">
            <img
              src={ASSETS.spiderNotice}
              alt=""
              width="280"
              height="221"
              className="la-dangle h-12 w-[3.8rem] select-none object-contain"
              draggable="false"
            />
            入住須知
          </h3>
          <button type="button" onClick={onClose} aria-label="關閉" className="rounded-full p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200">
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="space-y-4">
          {tips.map(({ Icon, title, body }, i) => (
            <li key={title} className="flex gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${CHARACTERS[ORDER[i % ORDER.length]].theme.iconBg}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium text-zinc-100">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">{body}</p>
              </div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={confirm}
          className="mt-6 w-full rounded-2xl bg-zinc-100 py-3.5 font-medium text-zinc-900 transition hover:bg-white"
        >
          我知道了
        </button>
      </div>
    </div>
  );
}

// ---------- Instagram 圖示（lucide 1.x 已移除品牌圖示，這裡自繪） ----------
const InstagramGlyph = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

// ---------- 支持我們：募資平台與 IG ----------
function SupportCard({ theme, onTap = () => {} }) {
  const live = Boolean(LINKS.crowdfunding);
  return (
    <article className="la-fade-up rounded-3xl border border-[#EDF1EC]/15 bg-zinc-900/60 p-6 backdrop-blur">
      <div className="mb-2 flex items-center gap-2 text-sm text-[#EDF1EC]">
        <HeartHandshake className="h-4 w-4" />
        讓若失公寓繼續亮著燈
      </div>
      <p className="mb-5 text-sm leading-relaxed text-zinc-400">
        這棟公寓由一群也正在迷惘中的學生建造起來。如果你在某個房間裡看見了自己，歡迎一起支持我們的畢業製作。
      </p>
      <div className="space-y-3">
        {live ? (
          <a
            href={LINKS.crowdfunding}
            onClick={onTap}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 font-medium transition active:scale-[0.99] ${theme.btn}`}
          >
            <HeartHandshake className="h-5 w-5" />
            前往募資平台支持我們
            <ExternalLink className="h-4 w-4 opacity-70" />
          </a>
        ) : (
          <div
            aria-disabled="true"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#EDF1EC]/30 px-5 py-3.5 text-[#EDF1EC]/70"
          >
            <Clock className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">募資計畫即將上線</span>
          </div>
        )}
        <a
          href={LINKS.instagram}
          onClick={onTap}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="前往若失公寓 Instagram @lost.apt"
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-950/40 px-5 py-3.5 text-zinc-100 transition hover:border-zinc-500"
        >
          <span className="whitespace-nowrap">Instagram @lost.apt</span>
        </a>
      </div>
    </article>
  );
}

// ---------- 結果頁：展覽資訊（放在「你來到若失公寓了」下面） ----------
function ExhibitionCard({ theme, className = "" }) {
  return (
    <div className={`w-full rounded-2xl border border-white/70 px-4 py-4 text-center ${className}`}>
      {/* 一行顯示：字級隨螢幕寬度縮放，最小的手機也不換行 */}
      <p className="whitespace-nowrap text-[min(0.95rem,3.6vw)] leading-relaxed text-zinc-100 lg:text-[0.95rem]">這些都是若失公寓的租客們，歡迎來體驗。</p>
      <p className={`mt-1 text-base font-semibold ${theme.text}`}>{EVENT.dates}</p>
      <p className="mt-1 flex items-center justify-center gap-1.5 text-[min(0.85rem,3.4vw)] text-zinc-400 lg:text-sm">
        <MapPin className="h-3.5 w-3.5 shrink-0" />
        <span className="whitespace-nowrap">{EVENT.place}</span>
      </p>
    </div>
  );
}

// ---------- 結果頁：看看其他租客（左右滑動） ----------
function OtherTenants({ others, onTap = () => {} }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const cards = Array.from(el.children);
    const left = el.scrollLeft;
    let best = 0;
    cards.forEach((card, i) => {
      if (Math.abs(card.offsetLeft - el.offsetLeft - left) < Math.abs(cards[best].offsetLeft - el.offsetLeft - left)) best = i;
    });
    // 滑到底時最後一張卡沒辦法貼齊左邊，直接算成最後一位
    if (left >= el.scrollWidth - el.clientWidth - 4) best = others.length - 1;
    setActive(Math.min(best, others.length - 1));
  };
  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.max(0, Math.min(others.length - 1, i));
    const card = el.children[idx];
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <article className="la-fade-up overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 py-6 backdrop-blur">
      <div className="mb-5 flex items-center gap-3 px-6">
        <img
          src={ASSETS.spiderArrowRight}
          alt=""
          width="200"
          height="154"
          className="h-9 w-12 shrink-0 select-none object-contain"
          draggable="false"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-medium text-zinc-50">看看其他租客</h3>
          <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">他們也各自帶著迷惘，住進了若失公寓。</p>
        </div>
        {/* 電腦上用箭頭切換；手機直接左右滑 */}
        <div className="hidden shrink-0 gap-2 md:flex">
          <button
            type="button"
            onClick={() => {
              onTap();
              goTo(active - 1);
            }}
            disabled={active === 0}
            aria-label="上一位租客"
            className="rounded-full border border-zinc-700 p-2 text-zinc-300 transition hover:border-zinc-500 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              onTap();
              goTo(active + 1);
            }}
            disabled={active === others.length - 1}
            aria-label="下一位租客"
            className="rounded-full border border-zinc-700 p-2 text-zinc-300 transition hover:border-zinc-500 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={onScroll}
        aria-label="其他租客"
        className="flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto overscroll-x-contain px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {others.map((k) => {
          const o = CHARACTERS[k];
          return (
            <li
              key={k}
              className={`w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl border ${o.theme.border} bg-zinc-950/50 sm:w-[60%] lg:w-[64%]`}
            >
              <div className="relative flex h-36 items-center justify-center bg-[#B8B6C2]">
                <img
                  src={ASSETS.objects[k]}
                  alt={o.objectAlt}
                  width="480"
                  height="480"
                  className="h-28 w-28 select-none object-contain [filter:drop-shadow(0_0_24px_rgba(255,255,255,0.75))_drop-shadow(0_0_56px_rgba(255,255,255,0.7))]"
                  draggable="false"
                />
              </div>
              <div className="p-4">
                <p className={`font-medium ${o.theme.text}`}>{o.roomName}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{o.lostLine}</p>
              </div>
            </li>
          );
        })}
        {/* 讓最後一張卡也能滑到最左邊對齊 */}
        <li aria-hidden="true" className="w-px shrink-0" />
      </ul>

      <div className="mt-4 flex items-center justify-center gap-2" aria-hidden="true">
        {others.map((k, i) => (
          <span
            key={k}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? `w-5 ${CHARACTERS[k].theme.bar}` : "w-1.5 bg-zinc-700"}`}
          />
        ))}
      </div>
    </article>
  );
}

// ---------- IG 限時動態分享圖（1080×1920，於瀏覽器內用 canvas 繪製） ----------
// IG 會在畫面上方約 250px、下方約 250px 疊上自己的按鈕，重要內容都放在中間安全區。
const STORY_W = 1080;
const STORY_H = 1920;
const STORY_FONT = '"LA Huninn", "Huninn", "PingFang TC", "Microsoft JhengHei", sans-serif';
const IG_HANDLE = "@lost.apt";

const hexA = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = reject;
    im.src = src;
  });

const roundRectPath = (g, x, y, w, h, r) => {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
};

// 中文逐字換行；標點不放行首
const wrapText = (g, text, maxW) => {
  const lines = [];
  let line = "";
  for (const ch of Array.from(text)) {
    const test = line + ch;
    if (g.measureText(test).width > maxW && line) {
      if ("，。、？！」』）…：；".includes(ch)) {
        line = test;
        continue;
      }
      lines.push(line);
      line = ch;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
};

async function renderStoryImage({ name, c }) {
  const hex = c.theme.hex;
  const tagline = `「${EVENT.name}」${EVENT.dates}${EVENT.place}`; // 只用來預先載入字型
  const allText = `${name}，你走進了${c.roomName}「${c.quote}」${c.hashtags.join("")}${IG_HANDLE}${tagline}LOST APARTMENT`;
  try {
    await Promise.all([26, 40, 72].map((size) => document.fonts.load(`${size}px "LA Huninn"`, allText)));
  } catch (_) {
    /* 字型載入失敗就用系統字 */
  }
  const [bg, wordmark, obj] = await Promise.all([
    loadImage(ASSETS.bgChalk),
    loadImage(ASSETS.wordmarkWeb),
    loadImage(ASSETS.objects[c.key]),
  ]);

  const cv = document.createElement("canvas");
  cv.width = STORY_W;
  cv.height = STORY_H;
  const g = cv.getContext("2d");
  const cx = STORY_W / 2;

  // 背景：社群背景圖 + 角色色光暈
  g.fillStyle = "#1E1E24";
  g.fillRect(0, 0, STORY_W, STORY_H);
  const s = Math.max(STORY_W / bg.width, STORY_H / bg.height);
  g.drawImage(bg, (STORY_W - bg.width * s) / 2, (STORY_H - bg.height * s) / 2, bg.width * s, bg.height * s);

  // 標準字
  const wmW = 600;
  const wmH = (wordmark.height * wmW) / wordmark.width;
  g.drawImage(wordmark, cx - wmW / 2, 200, wmW, wmH);

  // 標題
  g.textAlign = "center";
  g.textBaseline = "alphabetic";
  g.fillStyle = "rgba(237,241,236,0.78)";
  g.font = `400 40px ${STORY_FONT}`;
  g.fillText(`${name}，你走進了`, cx, 545);
  g.fillStyle = hex;
  g.font = `700 70px ${STORY_FONT}`;
  g.fillText(c.roomName, cx, 632, 960);

  // 拍立得
  g.save();
  g.translate(cx, 960);
  g.rotate(-0.025);
  const PW = 600;
  const PH = 505;
  g.shadowColor = "rgba(0,0,0,0.55)";
  g.shadowBlur = 50;
  g.shadowOffsetY = 20;
  g.fillStyle = "#F5F5F4";
  roundRectPath(g, -PW / 2, -PH / 2, PW, PH, 10);
  g.fill();
  g.shadowColor = "transparent";
  const pw = PW - 40;
  const ph = 400;
  const px = -pw / 2;
  const py = -PH / 2 + 20;
  g.fillStyle = "#B8B6C2"; // 拍立得照片底色（單色）
  roundRectPath(g, px, py, pw, ph, 4);
  g.fill();
  const os = 330;
  // 物件周圍的白色光暈（不是黑色陰影）
  g.save();
  g.shadowColor = "rgba(255,255,255,0.85)";
  g.shadowBlur = 140;
  g.drawImage(obj, -os / 2, py + (ph - os) / 2, os, os);
  g.drawImage(obj, -os / 2, py + (ph - os) / 2, os, os);
  g.shadowColor = "rgba(255,255,255,0.7)";
  g.shadowBlur = 60;
  g.drawImage(obj, -os / 2, py + (ph - os) / 2, os, os);
  g.restore();
  g.textAlign = "right";
  g.fillStyle = "rgba(82,82,91,0.75)";
  g.font = `400 17px ${STORY_FONT}`;
  g.fillText("LOST APARTMENT", px + pw - 18, py + ph - 16);
  g.textAlign = "left";
  g.fillStyle = "#27272a";
  g.font = `700 36px ${STORY_FONT}`;
  g.fillText(c.roomName, px + 20, py + ph + 60, pw - 40);
  g.restore();

  // 金句
  g.textAlign = "center";
  g.fillStyle = "#EDF1EC";
  g.font = `400 42px ${STORY_FONT}`;
  const quoteText = `「${c.quote}」`;
  let lines = wrapText(g, quoteText, 860);
  if (lines.length > 1) {
    // 平均分配每行字數，避免最後一行只剩一兩個字
    const balanced = wrapText(g, quoteText, (g.measureText(quoteText).width / lines.length) * 1.08);
    if (balanced.length === lines.length) lines = balanced;
  }
  lines.forEach((l, i) => g.fillText(l, cx, 1340 + i * 62));
  let y = 1340 + (lines.length - 1) * 62 + 82;

  // Hashtags
  g.font = `400 29px ${STORY_FONT}`;
  const pad = 24;
  const gap = 16;
  // 3–4 個 hashtag，一行放不下就換行，每行置中
  // 依字數由短到長排，一行放不下就換行（最長的會落在最後）
  const rows = [[]];
  let rowW = 0;
  sortedTags(c.hashtags).forEach((tag) => {
    const w = g.measureText(tag).width + pad * 2;
    if (rows.at(-1).length && rowW + gap + w > 900) {
      rows.push([]);
      rowW = 0;
    }
    rowW += (rows.at(-1).length ? gap : 0) + w;
    rows.at(-1).push({ tag, w });
  });
  rows.forEach((row, r) => {
    const ry = y + r * 74;
    let x = cx - (row.reduce((a, b) => a + b.w, 0) + gap * (row.length - 1)) / 2;
    row.forEach(({ tag, w }) => {
      roundRectPath(g, x, ry - 40, w, 58, 29);
      g.strokeStyle = "rgba(255,255,255,0.7)";
      g.lineWidth = 2;
      g.stroke();
      g.fillStyle = "#FFFFFF";
      g.fillText(tag, x + w / 2, ry);
      x += w + gap;
    });
  });

  // 頁尾：IG 帳號（給大家標註）＋展覽資訊，固定在同一高度
  y = 1632;
  g.font = `400 40px ${STORY_FONT}`;
  const handleW = g.measureText(IG_HANDLE).width;
  const icon = 40;
  const startX = cx - (icon + 16 + handleW) / 2;
  g.strokeStyle = "#EDF1EC";
  g.lineWidth = 3.5;
  roundRectPath(g, startX, y - 33, icon, icon, 11);
  g.stroke();
  g.beginPath();
  g.arc(startX + icon / 2, y - 33 + icon / 2, 9, 0, Math.PI * 2);
  g.stroke();
  g.beginPath();
  g.arc(startX + icon - 9, y - 33 + 9, 2.5, 0, Math.PI * 2);
  g.fillStyle = "#EDF1EC";
  g.fill();
  g.textAlign = "left";
  g.fillText(IG_HANDLE, startX + icon + 16, y);
  g.textAlign = "center";
  g.fillStyle = "rgba(237,241,236,0.55)";
  g.font = `400 28px ${STORY_FONT}`;
  g.fillText(`${EVENT.dates}・${EVENT.place}`, cx, y + 58);

  return new Promise((resolve) => cv.toBlob((b) => resolve(b), "image/png"));
}

// ---------- 限動分享視窗 ----------
function StoryModal({ story, theme, onClose, onTap = () => {} }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!story.open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [story.open, onClose]);
  if (!story.open) return null;

  const canShareFile =
    story.file && typeof navigator !== "undefined" && navigator.canShare && navigator.canShare({ files: [story.file] });

  const share = async () => {
    try {
      await navigator.share({ files: [story.file] });
    } catch (_) {
      /* 使用者取消或不支援 */
    }
  };
  const download = () => {
    const a = document.createElement("a");
    a.href = story.url;
    a.download = story.file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  const copyHandle = async () => {
    const ok = await copyText(IG_HANDLE);
    setCopied(ok);
    if (ok) setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="la-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-title"
        onClick={(e) => e.stopPropagation()}
        className="la-fade-up max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-950/95 p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 id="story-title" className="flex items-center gap-2 text-lg font-medium text-zinc-50">
            <InstagramGlyph className="h-5 w-5" />
            分享到 IG 限時動態
          </h3>
          <button type="button" onClick={onClose} aria-label="關閉" className="rounded-full p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {story.busy && <p className="py-16 text-center text-sm text-zinc-400">正在為你製作限動圖片⋯⋯</p>}
        {story.error && <p className="py-16 text-center text-sm text-[#C84658]">圖片製作失敗，請重新整理後再試一次。</p>}

        {story.url && (
          <>
            <img
              src={story.url}
              alt="測驗結果限動圖片預覽"
              className="mx-auto max-h-[52vh] w-auto rounded-2xl border border-white/10 shadow-2xl shadow-black/60"
            />
            <p className="mt-4 text-center text-sm leading-relaxed text-zinc-300">
              分享到限動時，記得標註 <span className={`font-semibold ${theme.text}`}>{IG_HANDLE}</span>
            </p>
            <div className="mt-4 space-y-3">
              {canShareFile ? (
                <button
                  type="button"
                  onClick={() => {
                    onTap();
                    share();
                  }}
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 font-medium transition active:scale-[0.99] ${theme.btn}`}
                >
                  <Share2 className="h-5 w-5" />
                  分享圖片
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onTap();
                    download();
                  }}
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 font-medium transition active:scale-[0.99] ${theme.btn}`}
                >
                  <ExternalLink className="h-5 w-5" />
                  下載圖片
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onTap();
                  copyHandle();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/60 px-5 py-3 text-zinc-200 transition hover:border-zinc-500"
              >
                {copied ? <CheckCircle2 className="h-4 w-4" /> : <InstagramGlyph className="h-4 w-4" />}
                {copied ? "已複製，在限動貼上即可標註" : `複製 ${IG_HANDLE}`}
              </button>
              <p className="text-center text-xs text-zinc-500">也可以長按圖片，儲存到相簿再上傳</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ---------- 階段三：結算推薦卡片 ----------
function Result({ name, resultKey, scores, answers, onRestart, onShare, shareState, onTap = () => {} }) {
  const [story, setStory] = useState({ open: false, busy: false, url: null, file: null, error: false });
  const c = CHARACTERS[resultKey];
  const t = c.theme;
  const openStory = async () => {
    onTap();
    setStory({ open: true, busy: true, url: null, file: null, error: false });
    try {
      const blob = await renderStoryImage({ name, c });
      const file = new File([blob], `若失公寓_${c.roomName}.png`, { type: "image/png" });
      setStory({ open: true, busy: false, url: URL.createObjectURL(blob), file, error: false });
    } catch (_) {
      setStory((st) => ({ ...st, busy: false, error: true }));
    }
  };
  const closeStory = () => {
    onTap();
    setStory((st) => {
      if (st.url) URL.revokeObjectURL(st.url);
      return { open: false, busy: false, url: null, file: null, error: false };
    });
  };
  const others = ORDER.filter((k) => k !== resultKey);
  const [tab, setTab] = useState("room"); // room | others（屬於「你的房間」，不顯示在分頁列）| support
  const sectionRef = useRef(null);
  const switchTab = (id) => {
    if (id === tab) return;
    onTap();
    setTab(id);
    // 已經往下捲時，切換後回到結果頁頂端
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
  };

  // 重新測驗（入住須知已在一開始讀過，這裡不再放）
  const utilityButtons = (
    <div>
      <button
        type="button"
        onClick={onRestart}
        className={`flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/60 px-4 py-3.5 text-zinc-200 transition ${t.hoverBorder}`}
      >
        <RotateCcw className="h-4 w-4" />
        重新測驗
      </button>
    </div>
  );

  return (
    <section ref={sectionRef} className="pb-10 pt-4 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:pt-4">
      {/* 看其他租客時：「回到你的房間」放在整頁最上面 */}
      {tab === "others" && (
        <div className="-mt-2 mb-3 lg:col-span-12">
          <button
            type="button"
            onClick={() => switchTab("room")}
            className="group -ml-1 flex items-center gap-1 rounded-full px-1 py-1 text-sm text-zinc-300 transition hover:text-white"
          >
            <ChevronLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            回到你的房間
          </button>
        </div>
      )}

      {/* 揭曉標題（手機、電腦都置中） */}
      <div className="la-fade-up flex flex-col items-center gap-1 lg:col-span-12">
        <img
          src={ASSETS.spiderIdea}
          alt=""
          width="320"
          height="238"
          className="la-bob h-12 w-auto select-none lg:h-16"
          draggable="false"
        />
        <p className="text-center text-sm tracking-[0.2em] text-zinc-400">{name}，你來到若失公寓了</p>
      </div>

      {/* 分頁列：你的房間／支持（置中，寬度和下方內容框一樣） */}
      <div className="mb-5 mt-4 flex flex-col items-center lg:col-span-12 lg:mb-10">
        <ResultTabs tab={tab} onTab={switchTab} theme={t} />
      </div>

      {/* 左欄：拍立得、Hashtag（電腦版固定在左邊） */}
      {tab !== "support" && (
      <div className={`${tab === "room" ? "" : "hidden lg:block"} space-y-4 lg:sticky lg:top-24 lg:col-span-5 lg:self-start lg:space-y-6`}>

        {/* 拍立得卡 */}
        <div className="la-fade-up mx-auto w-[68%] max-w-[16rem] -rotate-1 rounded-sm bg-stone-100 p-2.5 pb-3 shadow-2xl shadow-black/60 sm:max-w-xs lg:w-auto lg:max-w-sm lg:p-3 lg:pb-5" style={{ animationDelay: "0.1s" }}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-[#B8B6C2]">
            <div className={`la-ripple absolute left-1/2 top-1/2 -ml-16 -mt-16 h-32 w-32 rounded-full border ${t.border}`} />
            <div className={`la-ripple absolute left-1/2 top-1/2 -ml-16 -mt-16 h-32 w-32 rounded-full border ${t.border}`} style={{ animationDelay: "1.8s" }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img
                src={ASSETS.objects[c.key]}
                alt={c.objectAlt}
                width="480"
                height="480"
                className="la-bob h-[78%] w-auto select-none object-contain [filter:drop-shadow(0_0_24px_rgba(255,255,255,0.75))_drop-shadow(0_0_56px_rgba(255,255,255,0.7))]"
                draggable="false"
              />
            </div>
            <span className="absolute bottom-2 right-3 text-[10px] tracking-widest text-zinc-500">LOST APARTMENT</span>
          </div>
          <div className="px-2 pb-1 pt-3 text-zinc-800 lg:px-4 lg:pt-4">
            <p className="text-[11px] tracking-wider text-zinc-500 lg:text-xs">你走進了……</p>
            <p className="mt-0.5 text-base font-semibold lg:mt-1 lg:text-xl">{c.roomName}</p>
          </div>
        </div>

        {/* Hashtags */}
        <div className="la-fade-up flex flex-wrap justify-center gap-2" style={{ animationDelay: "0.2s" }}>
          {sortedTags(c.hashtags).map((tag) => (
            <span key={tag} className="rounded-full border border-white/70 px-3 py-1.5 text-sm text-white">
              {tag}
            </span>
          ))}
        </div>

      </div>

      )}

      {/* 右欄：「你的房間」內容 */}
      {tab === "room" && (
      <div key="room" className="la-fade-in mt-6 space-y-6 lg:col-span-7 lg:mt-0">
        {/* 共鳴獨白 */}
        <article className={`la-fade-up rounded-3xl border ${t.border} bg-zinc-900/60 p-6 backdrop-blur`} style={{ animationDelay: "0.25s" }}>
          {/* 金句放最上面、放大 */}
          <p className={`text-xl font-semibold leading-relaxed ${t.text}`}>「{c.quote}」</p>
          <p className="mt-2 text-right text-xs text-zinc-500">— {c.name}</p>
          <div className={`my-5 border-t ${t.border}`} />
          <p className="leading-loose text-zinc-200">{c.monologue}</p>
        </article>

        <button
          type="button"
          onClick={openStory}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-medium transition active:scale-[0.99] ${t.btn}`}
        >
          <InstagramGlyph className="h-5 w-5" />
          分享到 IG 限時動態
        </button>

        <NextTabButton label="看看其他租客" onClick={() => switchTab("others")} theme={t} />
        {utilityButtons}
      </div>
      )}

      {/* 「你的房間」裡的下一頁：看看其他租客（分頁列仍停在「你的房間」） */}
      {tab === "others" && (
      <div key="others" className="la-fade-in space-y-6 lg:col-span-7">
        {/* 看看其他租客：左右滑動 */}
        <OtherTenants others={others} onTap={onTap} />

        {/* 展覽資訊 */}
        <ExhibitionCard theme={t} />

        {/* 若失結語 */}
        <div className="py-4 text-center sm:px-2">
          <div className="mx-auto mb-6 h-px w-12 bg-zinc-700" />
          <div className="space-y-3 lg:space-y-0">
            {CLOSING_LINES.map((parts, i) => (
              <p key={i} className="text-[15px] leading-[2] text-zinc-400 max-[350px]:text-[14px] sm:text-base lg:leading-[2.2]">
                {parts.map((part) => (
                  <span key={part} className="inline-block">
                    {part}
                  </span>
                ))}
              </p>
            ))}
          </div>
          <img
            src={ASSETS.spiderYarn}
            alt="抱著毛線球的織蛛"
            width="360"
            height="356"
            className="la-dangle mx-auto mt-6 h-20 w-20 select-none object-contain"
            draggable="false"
          />
        </div>

        <NextTabButton label="支持若失公寓" onClick={() => switchTab("support")} theme={t} />
        {utilityButtons}
      </div>
      )}

      {/* 「支持」分頁：只放支持內容 */}
      {tab === "support" && (
        <div key="support" className="la-fade-in mx-auto w-full max-w-xl space-y-6 lg:col-span-12">
          {/* 支持若失公寓：募資平台 + Instagram */}
          <SupportCard theme={t} onTap={onTap} />
          {utilityButtons}
        </div>
      )}

      <footer className="flex flex-col items-center gap-3 pt-6 lg:col-span-12 lg:pt-12">
        <div className="flex items-center gap-3">
          <img
            src={ASSETS.wordmark}
            alt="若失公寓"
            width="560"
            height="205"
            className="h-9 w-auto select-none opacity-70"
            draggable="false"
          />
          <img
            src={ASSETS.spiderThanks}
            alt=""
            width="280"
            height="217"
            className="h-9 w-auto select-none opacity-90"
            draggable="false"
          />
        </div>
        <p className="text-xs tracking-[0.3em] text-zinc-600">LOST Apartment · 謝謝你來過</p>
      </footer>
      <StoryModal story={story} theme={t} onClose={closeStory} onTap={onTap} />
    </section>
  );
}

// ---------- 結果頁分頁列 ----------
const RESULT_TABS = [
  { id: "room", label: "你的房間" },
  { id: "support", label: "支持我們" },
];

function ResultTabs({ tab, onTab, theme }) {
  return (
    <nav
      role="tablist"
      aria-label="結果頁分頁"
      className="grid w-full max-w-xl grid-cols-2 gap-1 rounded-full border border-white/10 bg-zinc-950/95 p-1 shadow-lg shadow-black/40 backdrop-blur-md"
    >
      {RESULT_TABS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={(tab === "others" ? "room" : tab) === id}
          onClick={() => onTab(id)}
          className={`whitespace-nowrap rounded-full px-2 py-2.5 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-white/60 ${
            (tab === "others" ? "room" : tab) === id ? `font-medium ${theme.btn}` : "text-zinc-400 hover:text-zinc-100"
          }`}
        >
          {id === "room" && tab === "others" ? "租客房間" : label}
        </button>
      ))}
    </nav>
  );
}

// 「你的房間」最後的下一步，帶使用者到「支持」
function NextTabButton({ label, onClick, theme }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-700 px-6 py-3.5 text-sm text-zinc-300 transition ${theme.hoverBorder}`}
    >
      {label}
      <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
    </button>
  );
}

// ---------- 主組件 ----------
export default function LostApartmentQuiz() {
  const [stage, setStage] = useState("landing"); // landing | quiz | opening | result
  const [nickname, setNickname] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [locked, setLocked] = useState(false);
  const [resultKey, setResultKey] = useState(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const [guideBeforeStart, setGuideBeforeStart] = useState(false);
  const [shareState, setShareState] = useState("idle"); // idle | done | fail
  const timers = useRef([]);
  const [soundOn, setSoundOn] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const audio = useRef(null);

  const displayName = nickname.trim() || "新室友";
  const scores = useMemo(() => tallyScores(answers), [answers]);
  // 測驗與開門過場都保持中性色，不透露選項對應哪位租客；揭曉結果時才換成房間的顏色
  const theme = resultKey && stage === "result" ? CHARACTERS[resultKey].theme : null;

  const later = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // 預先載入主視覺圖片，避免開門動畫與結果頁出現空白閃爍
  useEffect(() => {
    const srcs = [
      ...ASSETS.doors,
      ASSETS.spiderQuestion,
      ASSETS.spiderIdea,
      ASSETS.spiderNotice,
      ASSETS.spiderThanks,
      ASSETS.spiderArrowLeft,
      ASSETS.spiderArrowRight,
      ASSETS.wordmark,
      ...Object.values(ASSETS.objects),
    ];
    srcs.forEach((s) => {
      if (!s) return;
      const im = new Image();
      im.src = s;
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage, qIndex]);

  // ---- 聲音：瀏覽器規定要等使用者第一次點擊／按鍵後才能出聲 ----
  const unlockAudio = () => {
    if (!audio.current) {
      try {
        audio.current = createAudioEngine();
      } catch (_) {
        audio.current = null;
      }
    }
    if (audio.current && audio.current.ctx.state !== "running") audio.current.ctx.resume();
    if (audio.current) {
      audio.current.wakeIOS(); // 必須在使用者點擊的當下呼叫
      setAudioUnlocked(true);
    }
  };
  const soundOnRef = useRef(soundOn);
  soundOnRef.current = soundOn;
  useEffect(() => {
    const first = () => {
      if (soundOnRef.current) unlockAudio();
    };
    window.addEventListener("pointerdown", first, true);
    window.addEventListener("keydown", first, true);
    return () => {
      window.removeEventListener("pointerdown", first, true);
      window.removeEventListener("keydown", first, true);
    };
  }, []);
  // 玄關、結算 → 平靜；測驗、開門 → 神秘
  useEffect(() => {
    if (!audioUnlocked || !audio.current) return;
    audio.current.playBgm(stage === "quiz" || stage === "opening" ? "mystery" : "calm");
  }, [stage, audioUnlocked]);
  useEffect(() => {
    if (audio.current) audio.current.setMuted(!soundOn);
  }, [soundOn, audioUnlocked]);
  // 切到背景分頁或鎖螢幕時暫停
  useEffect(() => {
    const onVis = () => {
      const a = audio.current;
      if (!a) return;
      if (document.hidden) {
        a.ctx.suspend();
        a.sleepIOS();
      } else if (soundOnRef.current) {
        a.ctx.resume();
        a.wakeIOS();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  const play = (name) => {
    const a = audio.current;
    if (a && soundOnRef.current && a.ctx.state !== "closed") a.sfx[name](); // 喚醒中的音效會在恢復後播出
  };
  const toggleSound = () => {
    if (!audioUnlocked) {
      setSoundOn(true);
      unlockAudio();
      return;
    }
    const next = !soundOn;
    if (audio.current) {
      if (next) audio.current.wakeIOS();
      else audio.current.sleepIOS();
    }
    setSoundOn(next);
  };

  // 掀開門簾 → 先跳出入住須知
  const openGuideBeforeStart = () => {
    play("tap");
    setGuideBeforeStart(true);
    setGuideOpen(true);
  };

  const start = () => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setQIndex(0);
    setResultKey(null);
    setShareState("idle");
    play("key");
    setStage("quiz");
  };

  const select = (charKey) => {
    if (locked) return;
    const next = [...answers];
    next[qIndex] = charKey;
    setAnswers(next);
    play("select");
    // 最後一題只記下答案，等玩家按「確認送出」
    if (qIndex >= QUESTIONS.length - 1) return;
    setLocked(true);
    later(() => {
      setLocked(false);
      setQIndex((i) => i + 1);
    }, 420);
  };

  const submit = () => {
    if (locked || answers.some((a) => !a)) return;
    setLocked(true);
    setResultKey(pickResult(tallyScores(answers)));
    setStage("opening");
    play("door");
    later(() => {
      setLocked(false);
      setStage("result");
      play("reveal");
    }, 1700);
  };

  const next = () => {
    if (locked || !answers[qIndex] || qIndex >= QUESTIONS.length - 1) return;
    play("tap");
    setQIndex((i) => i + 1);
  };

  const back = () => {
    if (locked) return;
    play("back");
    if (qIndex === 0) setStage("landing");
    else setQIndex((i) => i - 1);
  };

  const restart = () => {
    play("tap");
    setStage("landing");
    setQIndex(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setResultKey(null);
    setShareState("idle");
  };

  const share = async () => {
    if (!resultKey) return;
    play("tap");
    const c = CHARACTERS[resultKey];
    const text = [
      "【若失公寓 LOST Apartment｜你正經歷哪種「不知道」？】",
      `新室友 ${displayName} 的共鳴房間：${c.roomName}`,
      c.hashtags.join(" "),
      `「${c.quote}」`,
      `${EVENT.name} ${EVENT.dates} 在${EVENT.place}，歡迎來體驗。`,
      `追蹤若失公寓 IG：@lost.apt ${LINKS.instagram}`,
      LINKS.crowdfunding ? `支持我們的募資計畫：${LINKS.crowdfunding}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    let ok = false;
    if (navigator.share) {
      try {
        await navigator.share({ title: "若失公寓 LOST Apartment", text });
        ok = true;
      } catch (err) {
        if (err && err.name === "AbortError") return;
      }
    }
    if (!ok) ok = await copyText(text);
    setShareState(ok ? "done" : "fail");
    later(() => setShareState("idle"), 2600);
  };

  return (
    <div className="la-root relative min-h-screen bg-[#1E1E24] text-zinc-100 antialiased">
      <GlobalStyles />
      <Backdrop />
      <SoundToggle on={soundOn} unlocked={audioUnlocked} onToggle={toggleSound} />
      <SpiderCursor />

      <main className="relative mx-auto w-full max-w-lg px-5 py-8 sm:py-12 md:max-w-3xl md:px-8 lg:max-w-6xl lg:px-12" style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}>
        {stage === "landing" && <Landing nickname={nickname} setNickname={setNickname} onStart={openGuideBeforeStart} />}

        {stage === "quiz" && (
          <Quiz name={displayName} qIndex={qIndex} answers={answers} onSelect={select} onBack={back} onNext={next} onSubmit={submit} locked={locked} />
        )}

        {stage === "opening" && <Opening name={displayName} />}

        {stage === "result" && resultKey && (
          <Result
            name={displayName}
            resultKey={resultKey}
            scores={scores}
            answers={answers}
            onRestart={restart}
            onShare={share}
            shareState={shareState}
            onTap={() => play("tap")}
          />
        )}
      </main>

      <GuideModal
        open={guideOpen}
        beforeStart={guideBeforeStart}
        onClose={() => {
          play("tap");
          setGuideOpen(false);
        }}
        onConfirm={() => {
          setGuideOpen(false);
          if (guideBeforeStart) {
            setGuideBeforeStart(false);
            start();
          } else play("tap");
        }}
      />
    </div>
  );
}
