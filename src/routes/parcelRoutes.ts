import { Router } from "express";
import { createParcel, deleteParcels, fetchParcels, updateParcel, updateParcelStatus } from "../controller/parcelController";

const parcelRouter = Router()

parcelRouter.post('/create', createParcel)
parcelRouter.get('/allparcels', fetchParcels)
parcelRouter.delete('/delete/:parcelID', deleteParcels)
parcelRouter.put('/update/:parcelID', updateParcel)
parcelRouter.put('/updateStatus/:parcelID', updateParcelStatus)

export default parcelRouter;