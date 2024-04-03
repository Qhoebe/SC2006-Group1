//MAZDA

const models = `
  <option value="">Select Model</option>
  <option value="ES20170664284">BIANTE 2.0 AT DELUXE EU6</option>
  <option value="ES20210271269">CX-3 1.5 AT CLASSIC I3.5</option>
  <option value="ES20220169559">CX-3 1.5 AT CLASSIC I4</option>
  <option value="ES20210271175">CX-3 1.5 AT ELEGANCE I3.5</option>
  <option value="ES20220169579">CX-3 1.5 AT ELEGANCE I4</option>
  <option value="ES20180632877">CX-3 2.0 AT DELUXE 2WD</option>
  <option value="ES20170672074">CX-3 2.0 AT DELUXE EU6</option>
  <option value="ES20180632964">CX-3 2.0 AT STANDARD 2WD</option>
  <option value="ES20170672032">CX-3 2.0 AT STANDARD EU6</option>
  <option value="ES20191248153">CX-30 2.0 AT CLASSIC</option>
  <option value="ES20201136493">CX-30 2.0 AT CLASSIC FL</option>
  <option value="ES20220163423">CX-30 2.0 AT CLASSIC FL I2</option>
  <option value="ES20191248152">CX-30 2.0 AT ELEGANCE</option>
  <option value="ES20200922499">CX-30 2.0 AT ELEGANCE FL</option>
  <option value="ES20211257962">CX-30 2.0 AT ELEGANCE FL I2</option>
  <option value="ES20191241036">CX-30 2.0 AT LUXURY</option>
  <option value="ES20220163424">CX-30 2.0 AT LUXURY I2</option>
  <option value="ES20240234558">CX-30 2.0 AT LUXURY I4</option>
  <option value="ES20201031831">CX-30 2.0SC AT M-HEV 100 ANNIV SKY-X</option>
  <option value="ES20220491176">CX-5 2.0 AT CLASSIC I5</option>
  <option value="ES20201255061">CX-5 2.0 AT ELEGANCE 2WD I4</option>
  <option value="ES20220489481">CX-5 2.0 AT ELEGANCE I5</option>
  <option value="ES20230467751">CX-5 2.0 AT ELEGANCE I6</option>
  <option value="ES20201254794">CX-5 2.0 AT LUXURY 2WD I4</option>
  <option value="ES20220488882">CX-5 2.0 AT LUXURY I5</option>
  <option value="ES20220486115">CX-5 2.0 AT LUXURY SPORTS I5</option>
  <option value="ES20230363247">CX-5 2.0 AT LUXURY SPORTS I6</option>
  <option value="ES20240131595">CX-5 2.0 AT M-HYBRID CLASSIC I7</option>
  <option value="ES20240130463">CX-5 2.0 AT M-HYBRID LUXURY I7</option>
  <option value="ES20240128306">CX-5 2.0 AT M-HYBRID LUXURY SP I7</option>
  <option value="ES20180304262">CX-5 2.0 AT PREMIUM 2WD</option>
  <option value="ES20190115700">CX-5 2.0 AT PREMIUM 2WD I2</option>
  <option value="ES20200798274">CX-5 2.0 AT PREMIUM 2WD I3</option>
  <option value="ES20170554793">CX-5 2.0 AT PREMIUM EU6</option>
  <option value="ES20180305303">CX-5 2.0 AT STANDARD 2WD</option>
  <option value="ES20190115638">CX-5 2.0 AT STANDARD 2WD I2</option>
  <option value="ES20170560163">CX-5 2.0 AT STANDARD EU6</option>
  <option value="ES20190115595">CX-5 2.0 AT STANDARD PLUS 2WD I2</option>
  <option value="ES20200798120">CX-5 2.0 AT STANDARD PLUS 2WD I3</option>
  <option value="ES20180305398">CX-5 2.5 AT LUXURY 2WD</option>
  <option value="ES20190115721">CX-5 2.5 AT LUXURY 2WD I2</option>
  <option value="ES20200798520">CX-5 2.5 AT LUXURY 2WD I3</option>
  <option value="ES20170560289">CX-5 2.5 AT LUXURY EU6</option>
  <option value="ES20180304789">CX-5 2.5 AT SUPER LUXURY 2WD</option>
  <option value="ES20190115728">CX-5 2.5 AT SUPER LUXURY 2WD I2</option>
  <option value="ES20170554470">CX-5 2.5 AT SUPER LUXURY EU6</option>
  <option value="ES20220486341">CX-5 2.5 AT SUPER LUXURY I5</option>
  <option value="ES20230576394">CX-60 2.5 AT LUXURY</option>
  <option value="ES20231222271">CX-60 2.5 AT LUXURY RC</option>
  <option value="ES20200807976">CX-8 2.5 AT ELEGANCE 7 SEATER</option>
  <option value="ES20210598118">CX-8 2.5 AT ELEGANCE 7 SEATER I3</option>
  <option value="ES20200808007">CX-8 2.5 AT LUXURY 6 SEATER</option>
  <option value="ES20210488023">CX-8 2.5 AT LUXURY 6 SEATER I3</option>
  <option value="ES20230470075">CX-8 2.5 AT LUXURY 6 SEATER I4</option>
  <option value="ES20200805385">CX-8 2.5 AT LUXURY 7 SEATER</option>
  <option value="ES20210491927">CX-8 2.5 AT LUXURY 7 SEATER I3</option>
  <option value="ES20230469218">CX-8 2.5 AT LUXURY 7 SEATER I4</option>
  <option value="ES20210939735">CX-8 2.5 AT SUPER LUXURY 6 SEATER I3</option>
  <option value="ES20180867358">CX-9 2.5 AT TURBO LUXURY 4WD</option>
  <option value="ES20210489142">CX-9 2.5 AT TURBO 100TH ANNIV 4WD I4</option>
  <option value="ES20180968672">CX-9 2.5 AT TURBO 2WD</option>
  <option value="ES20170810038">CX-9 2.5 AT TURBO 2WD EU6</option>
  <option value="ES20180971175">CX-9 2.5 AT TURBO 4WD</option>
  <option value="ES20170811192">CX-9 2.5 AT TURBO 4WD EU6</option>
  <option value="ES20200479437">CX-9 2.5 AT TURBO LUXURY 2WD I3</option>
  <option value="ES20200265474">CX-9 2.5 AT TURBO SUPER LUXURY 4WD I3</option>
  <option value="ES20210494196">CX-9 2.5 AT TURBO SUPER LUXURY 4WD I4</option>
  <option value="ES20161296371">MAZDA2 5-DOOR HATCHBACK 1.5L SP.6EAT</option>
  <option value="ES20210828217">MAZDA2 HATCHBACK 1.5 AT CLASSIC I5</option>
  <option value="ES20180755599">MAZDA2 HATCHBACK 1.5 AT DELUXE 2WD</option>
  <option value="ES20200918585">MAZDA2 HATCHBACK 1.5 AT DELUXE I4</option>
  <option value="ES20210828243">MAZDA2 HATCHBACK 1.5 AT ELEGANCE I5</option>
  <option value="ES20230898577">MAZDA2 HATCHBACK 1.5 AT SPORTS I6</option>
  <option value="ES20180755600">MAZDA2 HATCHBACK 1.5 AT STANDARD 2WD</option>
  <option value="ES20200914452">MAZDA2 HATCHBACK 1.5 AT STANDARD I4</option>
  <option value="ES20200691895">MAZDA2 SEDAN 1.5 AT CLASSIC</option>
  <option value="ES20170810510">MAZDA2 SEDAN 1.5 AT DELUXE EU6</option>
  <option value="ES20200691839">MAZDA2 SEDAN 1.5 AT ELEGANCE</option>
  <option value="ES20170781775">MAZDA2 SEDAN 1.5 AT EU6</option>
  <option value="ES20200584972">MAZDA2 SEDAN 1.5 AT LUXURY</option>
  <option value="ES20200691894">MAZDA2 SEDAN 1.5 AT LUXURY PLUS</option>
  <option value="ES20170809954">MAZDA2 SEDAN 1.5 AT STANDARD PLUS EU6</option>
  <option value="ES20190459268">MAZDA3 4DR 1.5 AT M-HYBRID ASTINA</option>
  <option value="ES20211261356">MAZDA3 4DR 1.5 AT M-HYBRID ASTINA I2</option>
  <option value="ES20190459359">MAZDA3 4DR 1.5 AT M-HYBRID CLASSIC</option>
  <option value="ES20211260405">MAZDA3 4DR 1.5 AT M-HYBRID CLASSIC I2</option>
  <option value="ES20231115964">MAZDA3 4DR 1.5 AT M-HYBRID CLASSIC I4</option>
  <option value="ES20231218932">MAZDA3 4DR 1.5 AT M-HYBRID CLASSIC I4RC</option>
  <option value="ES20201137364">MAZDA3 4DR 1.5 AT M-HYBRID CLASSIC MK</option>
  <option value="ES20190559645">MAZDA3 4DR 1.5 AT M-HYBRID ELEGANCE</option>
  <option value="ES20211260404">MAZDA3 4DR 1.5 AT M-HYBRID ELEGANCE I2</option>
  <option value="ES20231010129">MAZDA3 4DR 1.5 AT M-HYBRID ELEGANCE I2RC</option>
  <option value="ES20231117553">MAZDA3 4DR 1.5 AT M-HYBRID ELEGANCE I4</option>
  <option value="ES20231223729">MAZDA3 4DR 1.5 AT M-HYBRID ELEGANCE I4RC</option>
  <option value="ES20231118399">MAZDA3 4DR 1.5 AT M-HYBRID LUXURY I4</option>
  <option value="ES20231222792">MAZDA3 4DR 1.5 AT M-HYBRID LUXURY I4RC</option>
  <option value="ES20190459313">MAZDA3 5DR 1.5 AT M-HYBRID ASTINA</option>
  <option value="ES20211261355">MAZDA3 5DR 1.5 AT M-HYBRID ASTINA I2</option>
  <option value="ES20231118561">MAZDA3 5DR 1.5 AT M-HYBRID ASTINA I4</option>
  <option value="ES20231223849">MAZDA3 5DR 1.5 AT M-HYBRID ASTINA I4RC</option>
  <option value="ES20190559666">MAZDA3 5DR 1.5 AT M-HYBRID ELEGANCE</option>
  <option value="ES20231115955">MAZDA3 5DR 1.5 AT M-HYBRID SPORTS I4</option>
  <option value="ES20231221596">MAZDA3 5DR 1.5 AT M-HYBRID SPORTS I4RC</option>
  <option value="ES20170557514">MAZDA3 HATCHBACK 1.5 AT DELUXE EU6</option>
  <option value="ES20170450682">MAZDA3 HATCHBACK 1.5 AT STANDARD EU6</option>
  <option value="ES20170445782">MAZDA3 HATCHBACK SPORTS 2.0 AT EU6</option>
  <option value="ES20170217500">MAZDA3 SEDAN 1.5 AT EU6</option>
  <option value="ES20170448324">MAZDA3 SEDAN 1.5 AT LED EU6</option>
  <option value="ES20170557379">MAZDA3 SEDAN SPORTS 2.0 AT EU6</option>
  <option value="ES20170562128">MAZDA5 WAGON 2.0 AT EU6</option>
  <option value="ES20180633217">MAZDA6 SEDAN 2.0 AT EXECUTIVE 2WD</option>
  <option value="ES20170552700">MAZDA6 SEDAN 2.0 AT EXECUTIVE EU6</option>
  <option value="ES20190788681">MAZDA6 SEDAN 2.0 AT EXECUTIVE I4</option>
  <option value="ES20210375490">MAZDA6 SEDAN 2.0 AT EXECUTIVE I5</option>
  <option value="ES20230361504">MAZDA6 SEDAN 2.0 AT EXECUTIVE I6</option>
  <option value="ES20231221987">MAZDA6 SEDAN 2.0 AT EXECUTIVE I6RC</option>
  <option value="ES20230358374">MAZDA6 SEDAN 2.0 AT LUXURY I6</option>
  <option value="ES20231223485">MAZDA6 SEDAN 2.0 AT LUXURY I6RC</option>
  <option value="ES20180634705">MAZDA6 SEDAN 2.0 AT STANDARD 2WD</option>
  <option value="ES20170664105">MAZDA6 SEDAN 2.0 AT STANDARD EU6</option>
  <option value="ES20190788630">MAZDA6 SEDAN 2.0 AT STANDARD I4</option>
  <option value="ES20210273201">MAZDA6 SEDAN 2.0 AT STANDARD I5</option>
  <option value="ES20180633935">MAZDA6 SEDAN 2.5 AT LUXURY 2WD</option>
  <option value="ES20190788691">MAZDA6 SEDAN 2.5 AT LUXURY I4</option>
  <option value="ES20180634713">MAZDA6 SEDAN 2.5 AT PREMIUM 2WD</option>
  <option value="ES20170558381">MAZDA6 SEDAN 2.5 AT PREMIUM EU6</option>
  <option value="ES20190788686">MAZDA6 SEDAN 2.5 AT PREMIUM I4</option>
  <option value="ES20170562761">MAZDA6 SEDAN 2.5 SUPER LUXURY EU6</option>
  <option value="ES20180634582">MAZDA6 WAGON 2.5 AT LUXURY 2WD</option>
  <option value="ES20170563286">MAZDA6 WAGON 2.5 AT LUXURY EU6</option>
  <option value="ES20190789240">MAZDA6 WAGON 2.5 AT LUXURY I4</option>
  <option value="ES20180635186">MAZDA6 WAGON 2.5 AT PREMIUM 2WD</option>
  <option value="ES20190788731">MAZDA6 WAGON 2.5 AT PREMIUM I4</option>
  <option value="ES20210376611">MAZDA6 WAGON 2.5 AT PREMIUM I5</option>
  <option value="ES20221031527">MX-30 EV</option>
  <option value="ES20231222793">MX-30 EV RC</option>
  <option value="ES20171043595">MX-5 HARDTOP 2.0 AT 2WD</option>
  <option value="ES20170556859">MX-5 HARDTOP 2.0 AT EU6</option>
  <option value="ES20180183562">MX-5 HARDTOP 2.0 MT 2WD</option>
  <option value="ES20170670395">MX-5 HARDTOP 2.0 MT EU6</option>
  <option value="ES20201025906">MX-5 RF 2.0 AT 100TH ANNIVERSARY EDITION</option>
  <option value="ES20210270129">MX-5 RF 2.0 AT I4</option>
  <option value="ES20210604354">MX-5 RF 2.0 MT I4</option>
  <option value="ES20190782722">MX-5 RF 30TH ANNIVERSARY EDITION 2.0 AT</option>
  <option value="ES20180971178">MX-5 RF HARDTOP 2.0 AT 2WD</option>
  <option value="ES20200479436">MX-5 RF HARDTOP 2.0 AT 2WD I3</option>
  <option value="ES20180971177">MX-5 RF HARDTOP 2.0 MT 2WD</option>
`;
export default models
