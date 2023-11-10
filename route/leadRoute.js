const route = require('express').Router()
const leadController = require('../controller/leadController')
// const auth = require('../middleware/auth')
// const adminAuth = require('../middleware/adminAuth')
const upload = require('../middleware/images')


route.post(`/createleads`, leadController.createLead)
route.post(`/bulkuploadleads`, leadController.bulkUpload)
route.post(`/getallleads`, leadController.getAllLeads)
route.post(`/getleadsbydates/:period`, leadController.getLeadsByDates)
route.post(`/getEveryLeads`, leadController.getEveryLeads)
route.get(`/getlead/:id`, leadController.getSingleLead)

route.patch('/updateLeadfile/:id', upload.single('file'), leadController.patchFile)
route.patch('/updateagrement/:id', upload.single('file'), leadController.patchAgreement)
route.delete(`/updateLead/:id/:filename`, leadController.deletefiles)
route.get(`/viewFile/:id/:filename`, leadController.viewfile)
route.get(`/downloadFile/:filename`, leadController.downloadfile)
route.get('/exporttoexcel', leadController.exportLeadsExcel);

route.patch(`/updateLeadnotes/:id`, leadController.addnotes)
route.put('/updateLead/:id', leadController.updateLead);
route.put('/updateLeadStatus/:id', leadController.updateLeadStatus)
route.put('/updateLeadStage/:id', leadController.updateLeadStage)
route.put('/updateLeadManager/:id', leadController.updateManager)
route.put('/updateLeadAssignee/:id', leadController.updateAssignee)
route.put('/leadfallowup/:id', leadController.leadfallowup)

route.patch(`/sendmail/:id`, leadController.sendMail)
route.patch('/shedulemeeting/:id', leadController.shedulemeeting);





module.exports = route