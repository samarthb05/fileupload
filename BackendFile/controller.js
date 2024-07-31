const pool =require('./db');
const upload =require('./upload');

const uploadfile = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const file_name = req.file.originalname;
        const file_path = req.file.path;

        try {
            const result = await pool.query(
                'Insert into upload (file_name,file_path) values ($1, $2) returning *',
                [file_name,file_path]
            );
            res.status(200).json({message: 'file uploaded successfully'});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

//get all uploaded file
const getallfiles = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const fileresult = await pool.query('Select * from upload limit $1 offset $2', [parseInt(limit, 10), offset]);
        
        const countResult = await pool.query('Select count(*) from upload');
        const total = parseInt(countResult.rows[0].count, 10);

        res.status(200).json({
            total,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            files: fileresult.rows,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//get file by id

const getfilebyId =async(req,res)=>{
    const {id}=req.params;
    try{
        const result= await pool.query(
            'Select * from upload where id = $1',[id]
        );
        if(result.rows.length===0){
            return res.status(404).json({error:'file Not Found'});
        }
        else{
            return res.status(200).json(result.rows[0]);
        }
    }catch(err){
        res.status(500).json({error:err.message});
    }
}


//edit file by id
const editfile = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const { id } = req.params;
        const file_name = req.file.originalname;
        const file_path = req.file.path;

        try {
            const result = await pool.query(
                'Update upload set file_name = $1, file_path = $2 where id = $3 returning *',
                [file_name, file_path, id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'File not found' });
            }

            res.status(200).json({ message: 'File updated successfully'});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

//delete file by id
const deletefile = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'Delete From upload where id = $1 returning *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'File not found' });
        } else {
            return res.status(200).json({ message: 'File deleted successfully'});
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



module.exports={

    uploadfile,
    getallfiles,
    getfilebyId,
    deletefile,
    editfile

}


