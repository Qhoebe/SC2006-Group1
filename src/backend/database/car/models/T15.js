//TOYOTA

const models = `
  <option value="">Select Model</option>
  <option value="ES20160832425">ALPHARD 2.5 CVT ELEGANCE S/R</option>
  <option value="ES20180528150-PI">ALPHARD 7-SEATER 2.5SC CVT</option>
  <option value="ES20201142332">ALPHARD ELEGANCE (AUTO)</option>
  <option value="ES20180398402">ALPHARD ELEGANCE MR (AUTO)</option>
  <option value="ES20230897678">ALPHARD HYBRID ELEGANCE (AUTO)</option>
  <option value="ES20230901509">ALPHARD HYBRID STANDARD (AUTO)</option>
  <option value="ES20230895240">BZ4X ELECTRIC 5DR SUV (AT)(2WD)</option>
  <option value="ES20171037949">C-HR 1.2 TURBO ACTIVE (AUTO)</option>
  <option value="ES20171037797">C-HR 1.2 TURBO LUXURY (AUTO)</option>
  <option value="ES20191240252">C-HR ACTIVE (AUTO) (2WD)</option>
  <option value="ES20170668487">CAMRY 2.0 AUTO</option>
  <option value="ES20180524194">CAMRY 2.5 AUTO</option>
  <option value="ES20181086101">CAMRY 4-DOOR SEDAN (AUTO) 2.0</option>
  <option value="ES20190232649">CAMRY 4-DOOR SEDAN (AUTO) 2.5</option>
  <option value="ES20210501193">CAMRY HYBRID 4DR SEDAN (AT) ELEGANCE</option>
  <option value="ES20210503579">CAMRY HYBRID 4DR SEDAN (AT) STANDARD</option>
  <option value="ES20231114469">COROLLA ALTIS 1.6 ELEGANCE</option>
  <option value="ES20180754496">COROLLA ALTIS 1.6 ELEGANCE (AUTO)</option>
  <option value="ES20240127161">COROLLA ALTIS 1.6 STANDARD</option>
  <option value="ES20180755148">COROLLA ALTIS 1.6 STANDARD (AUTO)</option>
  <option value="ES20220274009">COROLLA ALTIS 4DR SEDAN (AT) GR SPORT</option>
  <option value="ES20220271988">COROLLA ALTIS 4DR SEDAN (AT)(2WD) HYBRID</option>
  <option value="ES20170327150">COROLLA ALTIS ECO AUTO</option>
  <option value="ES20191026558">COROLLA ALTIS ELEGANCE (AUTO)(2WD)</option>
  <option value="ES20170327295">COROLLA ALTIS ELEGANCE AUTO</option>
  <option value="ES20231006042">COROLLA ALTIS HYBRID</option>
  <option value="ES20190911221">COROLLA ALTIS HYBRID ELEGANCE(AUTO)(2WD)</option>
  <option value="ES20191025972">COROLLA ALTIS STANDARD (AUTO)(2WD)</option>
  <option value="ES20180418859">COROLLA ALTIS STANDARD AUTO</option>
  <option value="ES20211044381-PI">COROLLA AXIO 1.5EX MANUAL</option>
  <option value="ES20220922992">COROLLA CROSS HYBRID SUV (AT) (2WD)</option>
  <option value="ES20160954453">DYNA 150 5MT</option>
  <option value="ES20170925365-PI">ESTIMA AERAS 2.4 CVT ABS AIRBAG 2WD</option>
  <option value="ES20170921663">FORTUNER 2.7 (A)</option>
  <option value="ES20210610614">FORTUNER 5DR SUV (AT) (2WD)</option>
  <option value="ES20190911224">FORTUNER TRD (AUTO)</option>
  <option value="ES20210267965">GR YARIS 3-DOOR HATCHBACK (MT) (4WD)</option>
  <option value="ES20221132455">GR86 AT</option>
  <option value="ES20220919758">GR86 MT</option>
  <option value="ES20200806048">HARRIER 2.0 SUV (AUTO) (2WD)</option>
  <option value="ES20201137310">HARRIER 2.5 HYBRID (AUTO) (2WD)</option>
  <option value="ES20210158719">HARRIER 2.5 HYBRID (AUTO) (2WD) PREMIUM</option>
  <option value="ES20170335081">HARRIER G GRADE</option>
  <option value="ES20170334742">HARRIER M GRADE</option>
  <option value="ES20231113571">HARRIER SUV HYBRID (AT) (2WD) PREMIUM</option>
  <option value="ES20230254979">HIACE HIGH ROOF COMMUTER TURBO AUTO</option>
  <option value="ES20180977926">HIACE HIROOF VAN TURBO 5DR AT</option>
  <option value="ES20180300638">HIACE HIROOF VAN TURBO 5DR MT</option>
  <option value="ES20230471414">HIACE VAN PETROL 5DR AT</option>
  <option value="ES20230471894">HIACE VAN PETROL 5DR MT</option>
  <option value="ES20140112060">HIACE VAN TURBO 4 DR AUTO</option>
  <option value="ES20210933715">HIACE VAN TURBO 4DR AT</option>
  <option value="ES20230255371">HIACE VAN TURBO 5DR AT</option>
  <option value="ES20210937033">HIACE VAN TURBO 5DR MT</option>
  <option value="ES20200806662">HILUX DOUBLE CAB TURBO PICKUP 2WD (MT)</option>
  <option value="ES20180971176">HILUX DOUBLE CAB TURBO PICKUP 2WD MT</option>
  <option value="ES20230901007">HILUX DOUBLE CAB TURBO PICKUP 4WD (AT)</option>
  <option value="ES20171032440">LEXUS CT200H 5DR HYBRID HATCHBACK (AUTO)</option>
  <option value="ES20211043204">LEXUS ES250 4DR SEDAN (AT) F-SPORT</option>
  <option value="ES20210935851">LEXUS ES250 4DR SEDAN (AT)(2WD) LUXURY</option>
  <option value="ES20210936333">LEXUS ES250 4DR SEDAN (AT)(2WD)EXECUTIVE</option>
  <option value="ES20180747277">LEXUS ES250 4DR SEDAN (AUTO) EXECUTIVE</option>
  <option value="ES20180639374">LEXUS ES250 4DR SEDAN (AUTO) LUXURY</option>
  <option value="ES20160840989">LEXUS ES250 EXECUTIVE A/T S/R</option>
  <option value="ES20160840947">LEXUS ES250 LUXURY A/T S/R</option>
  <option value="ES20211150198">LEXUS ES300H 4DR SEDAN (AT) EXECUTIVE</option>
  <option value="ES20210939540">LEXUS ES300H 4DR SEDAN (AT) LUXURY</option>
  <option value="ES20180755881">LEXUS ES300H 4DR SEDAN (AUTO) EXECUTIVE</option>
  <option value="ES20180747142">LEXUS ES300H 4DR SEDAN (AUTO) LUXURY</option>
  <option value="ES20231114691">LEXUS ES300H 4DR SEDAN EXECUTIVE</option>
  <option value="ES20231115423">LEXUS ES300H 4DR SEDAN LUXURY</option>
  <option value="ES20160840990">LEXUS ES300H EXECUTIVE CVT S/R</option>
  <option value="ES20160841012">LEXUS ES300H LUXURY CVT S/R</option>
  <option value="ES20170327654">LEXUS GS F</option>
  <option value="ES20170557728">LEXUS GS F (SR)</option>
  <option value="ES20200807087">LEXUS GS F 4-DOOR SEDAN (AUTO) (2WD)</option>
  <option value="ES20160841258">LEXUS GS200T EXECUTIVE</option>
  <option value="ES20160841257">LEXUS GS200T F SPORT</option>
  <option value="ES20160841259">LEXUS GS200T LUXURY</option>
  <option value="ES20171038330">LEXUS GS300 4DR SEDAN (AT) (2WD) LUXURY</option>
  <option value="ES20180409883">LEXUS GS300 4DR SEDAN (AT)(2WD) F-SPORT</option>
  <option value="ES20160240291">LEXUS GS350 LUXURY AT</option>
  <option value="ES20190336436">LEXUS GS450H LUXURY (AUTO) (2WD)</option>
  <option value="ES20160841260">LEXUS GS450H LUXURY CVT</option>
  <option value="ES20161058775">LEXUS IS200T EXECUTIVE</option>
  <option value="ES20161058776">LEXUS IS200T F SPORT</option>
  <option value="ES20190124354">LEXUS IS300 4DR SEDAN (AT) (2WD) EXE</option>
  <option value="ES20200808893">LEXUS IS300 4DR SEDAN (AUTO) (2WD) EXE</option>
  <option value="ES20171038595">LEXUS IS300 EXECUTIVE</option>
  <option value="ES20190235097">LEXUS IS300 F-SPORT (AUTO) (2WD)</option>
  <option value="ES20181085320">LEXUS IS300H 4DR SEDAN (AT) (2WD) EXE</option>
  <option value="ES20221028683">LEXUS IS300H 4DR SEDAN EXECUTIVE</option>
  <option value="ES20221028395">LEXUS IS300H 4DR SEDAN F-SPORT</option>
  <option value="ES20210595801">LEXUS IS300H 4DR SEDAN F-SPORT (AT)(2WD) </option>
  <option value="ES20221028513">LEXUS IS300H 4DR SEDAN LUXURY</option>
  <option value="ES20180525588">LEXUS IS300H EXECUTIVE 4DR SEDAN (AUTO)</option>
  <option value="ES20161058831">LEXUS IS300H LUXURY CVT</option>
  <option value="ES20201245777">LEXUS IS300H SEDAN (AT) (2WD) EXECUTIVE</option>
  <option value="ES20201142755">LEXUS IS300H SEDAN (AT) (2WD) LUXURY</option>
  <option value="ES20210267202">LEXUS IS300H SEDAN LUXURY W/O MOONROOF</option>
  <option value="ES20201142010">LEXUS IS350 4-DOOR SEDAN (AUTO)(2WD)</option>
  <option value="ES20231011481">LEXUS LBX</option>
  <option value="ES20240129941">LEXUS LBX ELEGANT</option>
  <option value="ES20170328157">LEXUS LC500</option>
  <option value="ES20191025939">LEXUS LC500 LIMITED EDITION</option>
  <option value="ES20240125167">LEXUS LC500 2DR CONVERTIBLE (AT)</option>
  <option value="ES20220275909">LEXUS LC500 2DR CONVERTIBLE (AT)(2WD)</option>
  <option value="ES20200812495">LEXUS LC500 2DR CONVERTIBLE (AUTO)(2WD)</option>
  <option value="ES20211258488">LEXUS LC500 2DR COUPE (AUTO)</option>
  <option value="ES20200587037">LEXUS LC500 2DR COUPE (AUTO)(2WD)</option>
  <option value="ES20170328158">LEXUS LC500H</option>
  <option value="ES20230787678">LEXUS LM350H 5DR MPV (AT) (4WD) LUXURY</option>
  <option value="ES20210155584">LEXUS LS350 4DR SEDAN (AT) (2WD)</option>
  <option value="ES20171037566">LEXUS LS350 F-SPORT MR (AT)</option>
  <option value="ES20171037683">LEXUS LS350 LUXURY MR (AUTO)</option>
  <option value="ES20210487041">LEXUS LS500 LUXURY 4-DR SEDAN (AT) (2WD)</option>
  <option value="ES20180180920">LEXUS LS500 LUXURY MR (AT) (2WD)</option>
  <option value="ES20210500801">LEXUS LS500 ULTRA LUXURY 4DR SEDAN (AT)</option>
  <option value="ES20211260442">LEXUS LS500H 4-DR SEDAN ULTRA LUXURY</option>
  <option value="ES20231224094">LEXUS LS500H 4DR SDN (AUTO) LUXURY</option>
  <option value="ES20210155589">LEXUS LS500H 4DR SEDAN (AT) (2WD)</option>
  <option value="ES20230467209">LEXUS LS500H 4DR SEDAN LUXURY (AT)</option>
  <option value="ES20180181225">LEXUS LS500H LUXURY MR (AT)(2WD)</option>
  <option value="ES20160841253">LEXUS NX200T CLASSIC</option>
  <option value="ES20160841252">LEXUS NX200T EXECUTIVE</option>
  <option value="ES20160841237">LEXUS NX200T F SPORT</option>
  <option value="ES20160841251">LEXUS NX200T LUXURY S/R</option>
  <option value="ES20181089582">LEXUS NX300 5DR SUV (AT) (4WD) LUXURY MR </option>
  <option value="ES20181195788">LEXUS NX300 5DR SUV (AT)(4WD) EXECUTIVE</option>
  <option value="ES20171038903">LEXUS NX300 EXECUTIVE</option>
  <option value="ES20171038907">LEXUS NX300 F SPORT</option>
  <option value="ES20171038905">LEXUS NX300 LUXURY S/R</option>
  <option value="ES20180643926">LEXUS NX300H 5DR SUV (A) (4WD) LUXURY MR</option>
  <option value="ES20181088190">LEXUS NX300H EXECUTIVE</option>
  <option value="ES20171038902">LEXUS NX300H LUXURY S/R</option>
  <option value="ES20211262440">LEXUS NX350 5DR SUV (A) (4WD) F-SPORT</option>
  <option value="ES20211262928">LEXUS NX350H 5DR (AT) (4WD) EXECUTIVE</option>
  <option value="ES20210826986">LEXUS NX350H 5DR (AT) (4WD) LUXURY</option>
  <option value="ES20231116083">LEXUS NX350H 5DR SUV (AT) (4WD) LUXURY</option>
  <option value="ES20230576511">LEXUS NX350H 5DR SUV (AT)(4WD) EXECUTIVE</option>
  <option value="ES20220813572">LEXUS NX350H HYBRID SUV (4WD) EXE 9.8</option>
  <option value="ES20211262800">LEXUS NX450H+ PLUG-IN HYBRID 5DR SUV</option>
  <option value="ES20170676326">LEXUS RC F COUPE</option>
  <option value="ES20161058769">LEXUS RC200T COUPE</option>
  <option value="ES20180188037">LEXUS RC300 2DR COUPE (AT) (2WD) SPORT</option>
  <option value="ES20160840412">LEXUS RX200T EXECUTIVE 2WD</option>
  <option value="ES20160840409">LEXUS RX200T F SPORT AWD S/R</option>
  <option value="ES20160840407">LEXUS RX200T LUXURY AT S/R</option>
  <option value="ES20210829333">LEXUS RX300 5DR SUV (AT) (2WD) EXECUTIVE</option>
  <option value="ES20210828060">LEXUS RX300 5DR SUV (AT) (4WD) LUXURY</option>
  <option value="ES20180528622">LEXUS RX300 F SPORT 5DR SUV M/R</option>
  <option value="ES20191017408">LEXUS RX350 5DR SUV (AUTO)(4WD) LUXURY</option>
  <option value="ES20160840052">LEXUS RX350 LUXURY AT SR</option>
  <option value="ES20231117514">LEXUS RX350H 5DR SUV (AT) (4WD) LUXURY</option>
  <option value="ES20231116394">LEXUS RX350H 5DR SUV (AT)(4WD) EXECUTIVE </option>
  <option value="ES20221135250">LEXUS RX350H LUXURY 5DR SUV (AT)</option>
  <option value="ES20190910986">LEXUS RX350L 5DR SUV (AT)(4WD)PREMIUM</option>
  <option value="ES20180295010">LEXUS RX350L PREMIUM</option>
  <option value="ES20200374940">LEXUS RX450H 5DR SUV (A) (4WD) LUXURY</option>
  <option value="ES20160840290">LEXUS RX450H PREMIUM CVT SR</option>
  <option value="ES20230148965">LEXUS RX450H+ 5DR SUV (AT) (4WD) LUXURY</option>
  <option value="ES20230149804">LEXUS RX500H TURBO 5DR SUV (AT) F SPORT</option>
  <option value="ES20230150342">LEXUS RZ450E BEV 5DR SUV (AT) LUXURY</option>
  <option value="ES20181086946">LEXUS UX200 5DR SUV (AT) (2WD) EXECUTIVE</option>
  <option value="ES20190562467">LEXUS UX200 5DR SUV (AT) (2WD) F-SPORT</option>
  <option value="ES20191246137">LEXUS UX200 5DR SUV (AT) (2WD) LUXURY</option>
  <option value="ES20181087556">LEXUS UX250H 5DR SUV (AT) (2WD) LUXURY</option>
  <option value="ES20181087145">LEXUS UX250H 5DR SUV (AT)(2WD) EXECUTIVE</option>
  <option value="ES20221134935">LEXUS UX250H 5DR SUV EXECUTIVE</option>
  <option value="ES20221135238">LEXUS UX250H 5DR SUV LUXURY</option>
  <option value="ES20201250582">LEXUS UX300E 5DR SUV (AT) (2WD) LUXURY</option>
  <option value="ES20240338513">LEXUS UX300H 5DR SUV (2WD) LUXURY</option>
  <option value="ES20160593821">PREVIA 2.4 CVT 7 SEATER</option>
  <option value="ES20160589865">PREVIA 2.4 CVT 7 SEATER MOONROOF</option>
  <option value="ES20160593769">PREVIA 2.4 CVT 8 SEATER MOONROOF</option>
  <option value="ES20160836117">PREVIA AERAS 2.4 CVT MR</option>
  <option value="ES20230362566">PRIUS</option>
  <option value="ES20210598991">PRIUS 5DR HATCHBACK (AUTO)</option>
  <option value="ES20220484740">PRIUS 5DR HATCHBACK (AUTO)(2WD)</option>
  <option value="ES20200155857">PRIUS C HYBRID 1.5 CVT</option>
  <option value="ES20170806724">PRIUS HYBRID 1.8 CVT</option>
  <option value="ES20180411217">PRIUS PLUS (AUTO)</option>
  <option value="ES20191133703">PRIUS PLUS (AUTO) WELCAB</option>
  <option value="ES20180635736">PRIUS PRIME 5DR (AUTO) EXCEL</option>
  <option value="ES20180636693">PRIUS PRIME 5DR (AUTO) BUSINESS EDITION</option>
  <option value="ES20231118154">PRIUS TAXI HATCHBACK(AT)(2WD)</option>
  <option value="ES20180754229">RAV4 2.0 PREMIUM (AUTO)</option>
  <option value="ES20220166109">RAV4 2.0 PREMIUM SUV (AUTO) (2WD)</option>
  <option value="ES20220166402">RAV4 HYBRID PREMIUM SUV (AUTO) (2WD)</option>
  <option value="ES20220698773">RAV4 HYBRID SPORTS SUV (AUTO) (2WD)</option>
  <option value="ES20160956818">RAV4 PREMIUM 2.0 CVT</option>
  <option value="ES20151100981">RAV4 PREMIUM A/T</option>
  <option value="ES20180521795">SIENTA 1.5 CVT ELEGANCE</option>
  <option value="ES20180521093">SIENTA 1.5 CVT STD</option>
  <option value="ES20190788813">SIENTA ELEGANCE (AUTO)</option>
  <option value="ES20220604199">SIENTA HYBRID</option>
  <option value="ES20220924273">SIENTA HYBRID STANDARD</option>
  <option value="ES20200583808">SIENTA HYBRID STANDARD (AUTO)</option>
  <option value="ES20190790678">SIENTA STANDARD (AUTO)</option>
  <option value="ES20230470583">SUPRA RZ 2-DR COUPE (AUTO) (2WD)</option>
  <option value="ES20201140060">SUPRA RZ 2DR COUPE (AUTO) (2WD)</option>
  <option value="ES20221240385">SUPRA RZ 2DR COUPE (MT) (2WD)</option>
  <option value="ES20190784985">SUPRA SZ-R 2DR COUPE (AUTO) (2WD)</option>
  <option value="ES20160832431">VELLFIRE 2.5 CVT S/R</option>
  <option value="ES20180302753-PI">VELLFIRE 2.5Z G-EDITION CVT</option>
  <option value="ES20210486702">VELLFIRE ELEGANCE (AUTO)</option>
  <option value="ES20180411033">VELLFIRE ELEGANCE MOONROOF (AUTO)</option>
  <option value="ES20201246454">VELLFIRE ELEGANCE WELCAB (AUTO)</option>
  <option value="ES20230785856">VELLFIRE HYBRID (AUTO)</option>
  <option value="ES20201245703">VIOS (E) 4-DOOR SEDAN (AUTO) (2WD)</option>
  <option value="ES20210384918">VIOS (G) 4-DOOR SEDAN (AUTO) (2WD)</option>
  <option value="ES20180755013">VIOS 1.5 E (AUTO)</option>
  <option value="ES20180751484">VIOS 1.5 G (AUTO)</option>
  <option value="ES20180418693">VIOS E (AUTO)</option>
  <option value="ES20180524102">VIOS G (AUTO)</option>
  <option value="ES20171145133-PI">VOXY HYBRID 1.8X CVT ABS D/AIRBAG 2WD 5D</option>
  <option value="ES20170338316">WISH 1.8 CVT</option>
  <option value="ES20201246159-PI">YARIS CROSS 1.5G AUTO</option>
  <option value="ES20211153149-PI">YARIS CROSS 1.5XB CVT</option>
  <option value="ES20240237339">YARIS CROSS HYBRID ACTIVE (AT) (2WD)</option>
  <option value="ES20201249703">YARIS CROSS HYBRID EXCITE (AT) (2WD)</option>
`;
module.exports = models;