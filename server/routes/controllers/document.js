const Document = require('../../database/Models/documentModel');


const fetchUserDoc = async (req, res) => {
    try {
        const owner = req.params.owner;

        const findDoc = await Document.find({owner}).select("-_id -users");

        if(findDoc){
            res.json(findDoc);
        }
    } catch (error) {
        throw new Error(`fetch doc error: ${error}`);
    }
}

const changeTitle = async (req, res) => {
    try {
        const {docId, title} = req.body;

        const doc = await Document.findOneAndUpdate({docId}, {title: title}, {new: true});

        if(doc){
            res.json(doc.title);
        }
    } catch (error) {
        throw new Error(`change title error ${error}`);
    }
}

const openDoc = async (req, res) => {
    try {
        const {docId, owner} = req.body;

        const isDocExists = await Document.findOne({ docId: docId, });

        if (isDocExists) {
            return res.json({
                title: isDocExists.title,
                docId: isDocExists.docId,
                data: isDocExists.data,
                users: isDocExists.users,
            });
        }

        // return res.send("not present");

        const newDoc = await Document.create({
            owner: owner,
            docId: docId,
            users: owner,
        });

        if (newDoc) {
            return res.json({
                title: newDoc.title,
                docId: newDoc.docId,
                data: newDoc.data,
            })
        }
    } catch (error) {
        throw new Error(`open doc error${error}`);
    }
}

const saveDoc = async (req, res) => {
    try {
        const { user, docId, data } = req.body;

        const doc = await Document.findOne({ docId });

        if (doc.users.includes(user)) {
            await doc.updateOne({ data: data }, { new: true });

            return res.json({
                owner: doc.owner,
                docId: doc.docId,
                data: doc.data,
            })
        }
        else {
            await doc.updateOne({ data: data, $push: { users: user } }, { new: true });

            return res.json({
                owner: doc.owner,
                docId: doc.docId,
                data: doc.data,
            })
        }

        // const doc = await Document.findOneAndUpdate({ docId }, { data: data }, { new: true });

        // if (doc) {
        //     return res.json({
        //         owner: doc.owner,
        //         docId: doc.docId,
        //         data: doc.data,
        //     })
        // }
    }
    catch (error) {
        throw new Error(`save doc error${error}`);
    }
}

module.exports = { openDoc, saveDoc, fetchUserDoc, changeTitle };