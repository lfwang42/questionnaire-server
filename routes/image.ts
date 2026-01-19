import express, { NextFunction, Request, Response} from 'express';
import * as combos from '../new_combos.json';
import client from '../index';



const router = express.Router();
router.use(express.json());
// This is used for getting user input.


interface ImageRequest extends Request {
    query: {
        size?: string,
        seen?: string,
    };
    data?: any // lazy
}


function pickRandomImage() {
    var obj_keys = Object.keys(combos);
    const randIndex = Math.floor(Math.random() * obj_keys.length)
    const randKey = obj_keys[randIndex]   
    const files = combos[randKey as keyof typeof combos]
    const resJson = {
        key: randKey,
        images: files.images,
        photo: files.photo,
        painting: files.painting
    }
    // const res = [];
    // try {
    //     for (const name of names) {
    //         res.push('https://style-transfer-questionnaire.s3.us-east-2.amazonaws.com/Combinations3/' + randKey + '/' + name);
    //     }
    // }
    // catch (err) {
    //     console.log(names);
    //     console.error(err);
    // }

    return resJson;
}
function fetchImageNames() {
    return async function(req: ImageRequest, res: Response, next: NextFunction) {
        const links = pickRandomImage();

        const query = req.query        
        req.data = links
        //get build ranks
        next();
    }
}


function insertResponse() {
    return async function(req: ImageRequest, res: Response, next: NextFunction) {
        const data = req.body;
        const key = data.key;
        const overall = data.overall;
        const preserve = data.preserve;
        const style = data.style;
        const text = data.text;
        const rcode = await client.query('INSERT INTO responses (key, overall, preserve, style, comments, overall_rating, preserve_rating, style_rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [key, overall, preserve, style, text, data.overallRating, data.preserveRating, data.styleRating]);   
        res.status(200).send({ message: 'Data received successfully' });
        next();
    }
}

router.route("/")
    .get([fetchImageNames()], (req: ImageRequest, res: Response) => {
        // console.log(req.data.detailInfo)
        // console.log(getStats(req.data.detailInfo.avatarDetailList[0]))
        // console.log(req.data.detailInfo.avatarDetailList[1].relicList)
        // getShield(req.data.detailInfo.avatarDetailList[0])
        res.json(req.data)
    })
    .post([insertResponse()], (req: Request, res: Response) => {
    })


router.get('/', (req: ImageRequest, res: Response) => {
    res.send(req.data)
})




router.route("/")

router.post('/', (req: Request, res: Response) => {
    // console.log('POST request received')
    // console.log('Content-Type:', req.headers['content-type'])
    // // @ts-ignore
    // console.log('req.body:', req.body)
    
})

export { router as imageRouter }


