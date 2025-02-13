import Facility from "../models/Facility.js";

export const createFacility = async (req, res) => {
    try {
        const newFacility = await Facility.create(req.body);
        res.status(201).json(newFacility);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getFacilities = async (req, res) => {
    try {
        const facilities = await Facility.find();
        res.json(facilities);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateFacility = async (req, res) => {
    try {
        const updatedFacility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedFacility);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteFacility = async (req, res) => {
    try {
        await Facility.findByIdAndDelete(req.params.id);
        res.json({ message: "Facility deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
