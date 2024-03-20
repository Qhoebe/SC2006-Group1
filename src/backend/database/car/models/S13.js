//SEAT
const models = `
  <option value="">Select Model</option>
  <option value="ES20160613506">ALHAMBRA 2.0 TDI 150 STYLE 6AT</option>
  <option value="ES20171031462">ALHAMBRA 2.0 TDI 184 STYLE 6AT</option>
  <option value="ES20190561334">ALHAMBRA STYLE 150 TSI 6AT</option>
  <option value="ES20170917980">ALHAMBRA STYLE 150 TSI 6AU</option>
  <option value="ES20190561392">ALHAMBRA STYLE 220 TFSI 6AT</option>
  <option value="ES20191129202">ALHAMBRA STYLE 220 TFSI 6AT S/R</option>
  <option value="ES20170918106">ALHAMBRA STYLE 220 TSI 6AU</option>
  <option value="ES20190800537">ALHAMBRA STYLE SUNROOF150 TSI 6AT</option>
  <option value="ES20190800475">ALHAMBRA STYLE XENON 150 TSI 6AT</option>
  <option value="ES20210503440">ARONA FR 1.0 TSI 116 7AT</option>
  <option value="ES20220379782">ARONA FR 1.0L TSI 7AT</option>
  <option value="ES20210160164">ARONA FR 1.5 TSI 7AT</option>
  <option value="ES20210379320">ARONA FR 1.5 TSI 7AT H</option>
  <option value="ES20171040211">ARONA STYLE 1.0 TSI 116 7AT</option>
  <option value="ES20220379337">ARONA STYLE 1.0L TSI 7AT</option>
  <option value="ES20171040807">ATECA 1.4 TSI 150 FR 6AT</option>
  <option value="ES20180860097">ATECA 1.4 TSI 150 FR 6AT SUNROOF</option>
  <option value="ES20190124603">ATECA 1.4 TSI 150 FR 7AT 2WD</option>
  <option value="ES20191022071">ATECA 1.4 TSI 150 FR SUNROOF 7AT 2WD</option>
  <option value="ES20171040584">ATECA 1.4 TSI 150 STYLE 6AT</option>
  <option value="ES20170557260">ATECA 1.4 TSI 150 STYLE 7AT</option>
  <option value="ES20191022155">ATECA 1.4 TSI 150 XCELL SUNROOF 7AT 2WD</option>
  <option value="ES20171040783">ATECA 1.4 TSI 150 XCELLENCE 6AT</option>
  <option value="ES20190786318">ATECA 1.4 TSI 150 XCELLENCE 6AT SUNROOF</option>
  <option value="ES20180977121">ATECA 1.4 TSI 150 XCELLENCE 7AT 2WD</option>
  <option value="ES20200923493">ATECA 5D 1.4 TSI FR 8AT 2WD</option>
  <option value="ES20200155676">ATECA 5D 1.4 TSI STYLE 8AT 2WD</option>
  <option value="ES20200810131">ATECA 5D 1.4 TSI XCELL 8AT 2WD SUNROOF</option>
  <option value="ES20200481716">ATECA 5D 1.4 TSI XCELLENCE 8AT 2WD</option>
  <option value="ES20201253161">ATECA 5D STYLE 1.4 TSI CA8 2WD</option>
  <option value="ES20201253431">ATECA 5D XPERIENCE 1.4 TSI CA8 2WD</option>
  <option value="ES20200150727">CUPRA ATECA 5D 2.0 TSI 7AT 4WD</option>
  <option value="ES20200810496">CUPRA ATECA 5D 2.0 TSI 7AT 4WD SUNROOF</option>
  <option value="ES20201031767">CUPRA ATECA 5D 2.0 TSI 7AT 4WD</option>
  <option value="ES20201142399">CUPRA ATECA 5D 2.0 TSI 7AT 4WD SUNROOF</option>
  <option value="ES20210160444">CUPRA ATECA 5DR 2.0 TSI 7AT 4WD</option>
  <option value="ES20220593881">CUPRA ATECA 5DR 2.0 TSI 7AT 4WD SUNROOF</option>
  <option value="ES20210596456">CUPRA FORMENTOR 1.5L TSI 110KW</option>
  <option value="ES20210500005">CUPRA FORMENTOR 1.5L TSI 110KW SUNROOF</option>
  <option value="ES20210597174">CUPRA FORMENTOR 2.0 TSI 140KW</option>
  <option value="ES20210599738">CUPRA FORMENTOR 2.0 TSI 140KW SUNROOF</option>
  <option value="ES20211257599">CUPRA FORMENTOR 2.0L TSI 190HP</option>
  <option value="ES20211258797">CUPRA FORMENTOR 2.0L TSI 190HP SUNROOF</option>
  <option value="ES20210596965">CUPRA FORMENTOR 2.0L TSI 228KW</option>
  <option value="ES20210500523">CUPRA FORMENTOR 2.0L TSI 228KW SUNROOF</option>
  <option value="ES20211047544">CUPRA FORMENTOR VZ 2.0L TSI 310HP</option>
  <option value="ES20211150458">CUPRA FORMENTOR VZ2.0L TSI 310HP SUNROOF</option>
  <option value="ES20210597384">CUPRA LEON 2.0L TSI 221KW</option>
  <option value="ES20210599714">CUPRA LEON 2.0L TSI 221KW SUNROOF</option>
  <option value="ES20211047598">CUPRA LEON 2.0L TSI 300HP</option>
  <option value="ES20220163955">CUPRA LEON 2.0L TSI 300HP SUNROOF</option>
  <option value="ES20210599001">CUPRA LEON SP 2.0L TSI 228KW</option>
  <option value="ES20210829700">CUPRA LEON SP 2.0L TSI 310HP</option>
  <option value="ES20211047589">CUPRA LEON SP 2.0L TSI 310HP SUNROOF</option>
  <option value="ES20161290731">IBIZA 5DR 1.0 ECOTSI 110 FR 7AT</option>
  <option value="ES20170791388">IBIZA 5DR 1.0 ECOTSI 110 FR 7AT PLUS</option>
  <option value="ES20160480827">IBIZA 5DR 1.0 ECOTSI 110 STYLE 7AT</option>
  <option value="ES20161291850">IBIZA 5DR 1.0 ECOTSI 110 STYLE PLUS 7AT</option>
  <option value="ES20161291847">IBIZA 5DR 1.0 ECOTSI 110 STYLE SE 7AT</option>
  <option value="ES20171040147">IBIZA 5DR 1.0 TSI 116 STYLE 7AT</option>
  <option value="ES20210160210">IBIZA 5DR FR 1.5 TSI 7AT</option>
  <option value="ES20210717335">IBIZA 5DR FR PLUS 1.5 TSI 7AT</option>
  <option value="ES20220379888">IBIZA 5DR STYLE 1.0L TSI 7AT</option>
  <option value="ES20220601339">IBIZA PA 5DR FR 1.5 TSI 7AT</option>
  <option value="ES20170446057">LEON 5DR 1.0 TSI 116 STYLE 7AT</option>
  <option value="ES20171040950">LEON 5DR 1.0 TSI 116 STYLE PLUS 7AT</option>
  <option value="ES20170328958">LEON 5DR 1.2 TSI 110 STYLE 6MT</option>
  <option value="ES20170669344">LEON 5DR 1.2 TSI 110 STYLE 7AT</option>
  <option value="ES20161291854">LEON 5DR 1.2 TSI 110 STYLE PLUS 7AT</option>
  <option value="ES20181203434">LEON 5DR 1.4 TSI 150 FR 7AT</option>
  <option value="ES20170922113">LEON 5DR CUPRA 2.0 TSI 290 6AT</option>
  <option value="ES20160586489">LEON 5DR FR 2.0 TDI 150 6MT</option>
  <option value="ES20210596784">LEON FR1.5 ETSI 110KW</option>
  <option value="ES20170446401">LEON SC 1.0 TSI 116 STYLE 7AT</option>
  <option value="ES20160590858">LEON SC 1.2 TSI 110 STYLE 7AT</option>
  <option value="ES20210487018">LEON SP FR 1.5 ETSI</option>
  <option value="ES20220379176">LEON SP FR 1.5 ETSI SUNROOF</option>
  <option value="ES20171040841">LEON ST 1.0 TSI 116 STYLE 7AT</option>
  <option value="ES20171040851">LEON ST 1.0 TSI 116 STYLE 7AT</option>
  <option value="ES20160590408">LEON ST 1.6 TDI 110 STYLE 5MT</option>
  <option value="ES20160591269">LEON ST FR 2.0 TDI 150 6MT</option>
  <option value="ES20190805305">TARRACO STYLE 1.4 TSI 150 6AT</option>
  <option value="ES20190339315">TARRACO XCELL 1.4 TSI 150 6AT</option>
  <option value="ES20220597803">TARRACO XCELL 2.0L TSI 7AT 4WD</option>
  <option value="ES20190805216">TARRACO XCELL SUNROOF 1.4 TSI 150 6AT</option>
  <option value="ES20220699620">TARRACO XCELL SUNROOF 2.0L TSI 7AT 4WD</option>
  <option value="ES20160589146">TOLEDO 1.2 TSI 90 STYLE 5MT</option>
  <option value="ES20161202577">TOLEDO 1.4 TDI 90 STYLE 7AT</option>
  <option value="ES20161202611">TOLEDO 1.4 TDI 90 STYLE 7AT</option>
  <option value="ES20181089519">TOLEDO 1.4 TSI 125 STYLE 7AT</option>
`;
module.exports = models;