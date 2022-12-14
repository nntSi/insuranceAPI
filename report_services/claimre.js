const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");

const db = require('../db/database');
const { claim, inspector, company, employee, province, districts } = db;
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require('../db/database');
db.sequelize.sync();
// import my module

// Load the docx file as binary content
const content = fs.readFileSync(
    path.resolve(__dirname, "../docx/claim.docx"),
    "binary"
);

module.exports.claimWord = async (req, res) => {
    /* console.log(req.body) */
    /* const thisclaim = await claim.findAll({
        where : {
            svh_code : req.params.svhcode
        }
    }); */
    const [results, metadata] = await sequelize
    .query("SELECT * FROM claim LEFT JOIN province ON claim.province=province.id WHERE svh_code = ?", {
      replacements: [req.params.svhcode],
      type: QueryTypes.SELECT
    });
    const [results2, metadata2] = await sequelize
    .query("SELECT * FROM claim LEFT JOIN districts ON claim.district=districts.id WHERE svh_code = ?", {
      replacements: [req.params.svhcode],
      type: QueryTypes.SELECT
    });
    /* console.log(results.name); */
    const month_th = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    const dateArray = results.date.split("-");
    console.log(results2.name);

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
    doc.render({
        /* svhcode: "sfgsss" */
        svh_code: results.svh_code,
        employee: results.employee,
        inspector: results.Inspector,
        inspector_mobile: results.inspector_mobile,
        company: results.company,
        type: results.type,
        location: results.location,
        date: parseInt(dateArray[2]),
        month: month_th[parseInt(dateArray[1]) - 1],
        year: dateArray[0],
        district: results2.name,
        province: results.name,
        source_employee: results.source_employee,
        customer_claim_name: results.customer_claim_name,
        customer_claim_mobile: results.customer_claim_mobile,
        license_plate: results.license_plate,
        brand_car: results.brand_car,
        time: results.time
    });
    buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
    });
    console.log(buf);
    res.writeHead(200, {
        "Content-Type": "application/docx",
        "Content-Disposition": "attachment"
    }).end(buf)
    return fs.writeFileSync(path.resolve(__dirname, req.params.svhcode + "ori.docx"), buf);
}