//VOLKSWAGEN

const models = `
  <option value="">Select Model</option>
  <option value="ES20220705222">ARTEON ELEGANCE 2.0 TSI</option>
  <option value="ES20170811603">ARTEON R-LINE</option>
  <option value="ES20231224300">ARTEON R-LINE 2.0</option>
  <option value="ES20220604417">ARTEON R-LINE 2.0 TSI</option>
  <option value="ES20180291747">BEETLE 1.2 TSI</option>
  <option value="ES20170918462">BEETLE CABRIOLET 1.2 DSG</option>
  <option value="ES20190113750">BEETLE DUNE 1.2 TSI</option>
  <option value="ES20180396606">BEETLE DUNE 1.4 TSI</option>
  <option value="ES20160466763">CADDY 1.4 TSI AT SABHK5</option>
  <option value="ES20140849215">CADDY 1.6 TDI A/T (STEEL RIMS)</option>
  <option value="ES20130179866">CADDY 1.6 TDI AT 2CAA85</option>
  <option value="ES20150637233">CADDY 1.6 TDI AT 2CAA85 NW WGD</option>
  <option value="ES20150536686">CADDY 1.6 TDI AT 2CAA85 PANEL VAN 5DR</option>
  <option value="ES20130589591">CADDY 1.6 TDI MT 2CAA72</option>
  <option value="ES20150208612">CADDY 1.6 TDI MT 2CAA72 W/O WIND</option>
  <option value="ES20150427614">CADDY 1.6 TDI MT 2CAA72 W/O WIND 5DR</option>
  <option value="ES20140112002">CADDY 2.0 TDI AT 2CAA96</option>
  <option value="ES20210611910">CADDY LWB 2.0 TDI</option>
  <option value="ES20220272682">CADDY LWB 2.0 TDI WDW</option>
  <option value="ES20160467138">CADDY MAXI 1.4 TSI AT SAJHK5</option>
  <option value="ES20140415397">CADDY MAXI 2.0 TDI AT 2CHA96</option>
  <option value="ES20140850462">CADDY MAXI PANEL VAN 1.6 TDI A/T 6DR</option>
  <option value="ES20140851005">CADDY MAXI PANEL VAN 1.6 TDI M/T 6DR</option>
  <option value="ES20161072533">CADDY MAXI TDI DSG</option>
  <option value="ES20170328478">CADDY MAXI TDI DSG WIN</option>
  <option value="ES20191247628">CADDY MAXI TDI DSG WIN HID</option>
  <option value="ES20191128783">CADDY MAXI VAN 1.4 TSI</option>
  <option value="ES20150208595">CADDY MAXI VAN 1.6 TDI M/T WIND FOGL</option>
  <option value="ES20191132230">CADDY MAXI VAN 2.0 TDI MT</option>
  <option value="ES20210495008">CADDY NWB 2.0 TDI</option>
  <option value="ES20220816805">CADDY NWB 2.0 TDI WDW</option>
  <option value="ES20170789970">CADDY TDI A TLG WINHID</option>
  <option value="ES20191242971">CADDY TDI A WGDR 1SDR WINHID</option>
  <option value="ES20170789182">CADDY TDI A WGDR WINHID</option>
  <option value="ES20161293163">CADDY TDI DSG WGDR</option>
  <option value="ES20191243122">CADDY TDI DSG WGDR SIDE</option>
  <option value="ES20170114858">CADDY TDI DSG WGDR WIN</option>
  <option value="ES20191028083">CADDY VAN 1.4 TSI</option>
  <option value="ES20200690944">CADDY VAN 2.0 TDI MT</option>
  <option value="ES20191241717">CADDY VAN TDI MT</option>
  <option value="ES20210720298">CRAFTER VAN 2.0 TDI</option>
  <option value="ES20151104242">GOLF 1.2 TSI AT 5G12BZ</option>
  <option value="ES20151104720">GOLF 1.4 TSI AT 5G13HZ</option>
  <option value="ES20160245735">GOLF 1.4 TSI AT 5G13HZ HID</option>
  <option value="ES20160243433">GOLF 1.4 TSI AT 5G13HZ HID SR</option>
  <option value="ES20180521407">GOLF 1.4 TSI CL</option>
  <option value="ES20200262068">GOLF 1.4 TSI CL RL</option>
  <option value="ES20180291675">GOLF 1.4 TSI HL</option>
  <option value="ES20200264735">GOLF 1.4 TSI HL RL</option>
  <option value="ES20210598671">GOLF 1.5 LIFE ETSI</option>
  <option value="ES20210493837">GOLF 1.5 LIFE PLUS ETSI</option>
  <option value="ES20231112088">GOLF 1.5 R-LINE</option>
  <option value="ES20210486375">GOLF 1.5 R-LINE ETSI</option>
  <option value="ES20230680795">GOLF 2.0 R</option>
  <option value="ES20230573185">GOLF 2.0 R PERFORMANCE</option>
  <option value="ES20170786044">GOLF GTI 2.0 DSG</option>
  <option value="ES20210385142">GOLF GTI 2.0 TSI</option>
  <option value="ES20160698816">GOLF GTI 2.0 TSI 5G19TY</option>
  <option value="ES20210606772">GOLF GTI 2.0 TSI FL</option>
  <option value="ES20230469287">GOLF GTI 2.0 TSI FL RCRT</option>
  <option value="ES20230151601">GOLF LIFE 1.5 ETSI</option>
  <option value="ES20231006572">GOLF LIFE PLUS 1.5 ETSI</option>
  <option value="ES20140200640">GOLF R 2.0 5G1RVR 5DR</option>
  <option value="ES20160698862">GOLF R 2.0 AT SR 5G1RVR</option>
  <option value="ES20170787757">GOLF R 2.0 DSG</option>
  <option value="ES20180635815">GOLF SV 1.4 TSI CL</option>
  <option value="ES20180861175">GOLF SV 1.4 TSI HL</option>
  <option value="ES20170897833">GOLF TSI TL</option>
  <option value="ES20180644463">GOLF VARIANT R-LINE</option>
  <option value="ES20180179473">PASSAT 2.0 TFSI AT W/OSR 3G24MY</option>
  <option value="ES20191135098">PASSAT 2.0 TSI BT</option>
  <option value="ES20210715298">PASSAT 2.0 TSI BT AID</option>
  <option value="ES20191135031">PASSAT 2.0 TSI GT</option>
  <option value="ES20200920744">PASSAT 2.0 TSI GT SUNROOF</option>
  <option value="ES20150641217">PASSAT B8 1.8 TFSI AT 3G24JZ</option>
  <option value="ES20160359666">PASSAT B8 1.8 TFSI AT SR 17W 3G24JZ AID</option>
  <option value="ES20170106610">PASSAT B8 1.8 TFSI AT SR 17W 3G24JZ HUD</option>
  <option value="ES20150860589">PASSAT B8 1.8 TFSI AT SR NAV 17W 3G24JZ</option>
  <option value="ES20150641841">PASSAT B8 1.8 TFSI AT SR NAV 3G24JZ</option>
  <option value="ES20160583912">PASSAT B8 2.0 3G24MY R-LINE HUD</option>
  <option value="ES20160236582">PASSAT B8 2.0 TFSI 3G24MY R-LINE AID</option>
  <option value="ES20151107911">PASSAT B8 2.0 TFSI AT SR 3G24MY</option>
  <option value="ES20160604344">PASSAT B8 2.0 TFSI AT SR 3G24MY HUD</option>
  <option value="ES20151108337">PASSAT VARIANT R-LINE 2.0 TSI</option>
  <option value="ES20160722483">PASSAT VARIANT R-LINE 2.0 TSI HUD</option>
  <option value="ES20180748984">POLO 1.0 TSI</option>
  <option value="ES20180525253">POLO 1.0 TSI CL</option>
  <option value="ES20180977290">POLO 1.0 TSI CL BEATS</option>
  <option value="ES20150868874">POLO GP 1.2 TSI A/T 6C13EZ SR LED</option>
  <option value="ES20140742843">POLO GP 1.2 TSI A/T ABS D/AIRBAG 2WD 5DR</option>
  <option value="ES20151197943">POLO GP 1.2 TSI AT 6C13EZ R-LINE</option>
  <option value="ES20160718700">SHARAN 1.4 TSI 7N23GY</option>
  <option value="ES20191023837">SHARAN 2.0 TSI</option>
  <option value="ES20160835184">SHARAN 2.0 TSI 7N24MY</option>
  <option value="ES20170334983">SHARAN 2.0 TSI 7N24MY BS</option>
  <option value="ES20160715361">SHARAN 2.0 TSI 7N24MY EQP</option>
  <option value="ES20200267190">SHARAN 2.0 TSI STD ROOF</option>
  <option value="ES20150750469">SPORTSVAN 1.4 AT AM13HZ CL</option>
  <option value="ES20150748360">SPORTSVAN 1.4 HIGHLINE AM14HZ</option>
  <option value="ES20160602446">SPORTSVAN 2.0 TDI AM146Y</option>
  <option value="ES20200688180">T-CROSS</option>
  <option value="ES20221135385">T-CROSS R-LINE</option>
  <option value="ES20220380338">T-CROSS R-LINE 1.5 TSI</option>
  <option value="ES20170668404">T6 VAN TDI LWB DSG</option>
  <option value="ES20170784159">T6 VAN TDI LWB MT</option>
  <option value="ES20161072337">T6 VAN TDI NWB DSG</option>
  <option value="ES20181089629">T6 VAN TDI NWB DSG TLG</option>
  <option value="ES20181087289">T6 VAN TDI NWB MT</option>
  <option value="ES20201247760">T6.1 2.0 TDI</option>
  <option value="ES20220170075">T6.1 2.0 TDI WDW</option>
  <option value="ES20201247403">T6.1 NWB 2.0 TDI LED</option>
  <option value="ES20220596929">T6.1 NWB 2.0 TDI LED FRT FOG</option>
  <option value="ES20221137140">T6.1 TDI</option>
  <option value="ES20190913862">TIGUAN 1.4 TSI HL</option>
  <option value="ES20191027751">TIGUAN 1.4 TSI HL STD ROOF</option>
  <option value="ES20191023340">TIGUAN 1.4 TSI R-LINE</option>
  <option value="ES20210605980">TIGUAN 2.0 ELEGANCE</option>
  <option value="ES20210823819">TIGUAN 2.0 ELEGANCE SR</option>
  <option value="ES20230469906">TIGUAN 2.0 ELEGANCE SR RCRT</option>
  <option value="ES20210494470">TIGUAN 2.0 R-LINE</option>
  <option value="ES20210823585">TIGUAN 2.0 R-LINE A V</option>
  <option value="ES20230574480">TIGUAN 2.0 R-LINE AV RCRT</option>
  <option value="ES20161189314">TIGUAN COMFORTLINE 280 TSI</option>
  <option value="ES20160727833">TIGUAN COMFORTLINE 280 TSI EQP</option>
  <option value="ES20161058915">TIGUAN COMFORTLINE 330 TDI EQP</option>
  <option value="ES20160954664">TIGUAN HIGHLINE 280 TSI</option>
  <option value="ES20161179956">TIGUAN HIGHLINE 280 TSI R-LINE</option>
  <option value="ES20210375398">TIGUAN R-LINE 1.4 TSI</option>
  <option value="ES20161175875">TIGUAN R-LINE 380 TSI</option>
  <option value="ES20190677934">TOUAREG 3.0</option>
  <option value="ES20190344614">TOUAREG 3.0 AT</option>
  <option value="ES20190802357">TOUAREG 3.0 AT W/OHUD</option>
  <option value="ES20190118766">TOUAREG 3.0 R-LINE</option>
  <option value="ES20230789625">TOUAREG ELEGANCE 3.0</option>
  <option value="ES20230792329">TOUAREG R-LINE 3.0</option>
  <option value="ES20201029038">TOURAN 1.4 TSI</option>
  <option value="ES20151217203">TOURAN 1.4 TSI CL 5T13NZ</option>
  <option value="ES20160601151">TOURAN 1.4 TSI CL 5T13NZ HLG</option>
  <option value="ES20190456752">TOURAN 1.4 TSI CL 5T13NZ HLG SA</option>
  <option value="ES20160476395">TOURAN 1.4 TSI CL 5T13NZ SA</option>
  <option value="ES20170106145">TOURAN 1.4 TSI CL 5T13NZ SA STD RF</option>
  <option value="ES20200918291">TOURAN 1.4 TSI R-LINE</option>
  <option value="ES20200919982">TOURAN 1.4 TSI R-LINE STD RF</option>
  <option value="ES20160130540">TOURAN 1.4 TSI TL 5T12NZ</option>
  <option value="ES20160840084">TOURAN 1.6 TDI CL AT 5T133Z HLG</option>
  <option value="ES20160127959">TOURAN 1.6 TDI CL AT SR 5T133Z</option>
  <option value="ES20170109651">TOURAN CL 280 TDI</option>
  <option value="ES20161073505">TOURAN CL 280 TDI EQP</option>
  <option value="ES20220487218">TOURAN HL 1.5 TSI</option>
  <option value="ES20220484182">TOURAN R-LINE 1.5 TSI</option>
  <option value="ES20200480371">TRANSPORTER T6.1 NWB 2.0 TDI</option>
`;
export default models
