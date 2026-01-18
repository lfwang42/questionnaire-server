"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRouter = void 0;
const express_1 = __importDefault(require("express"));
const combos = __importStar(require("../new_combos.json"));
const index_1 = __importDefault(require("../index"));
const router = express_1.default.Router();
exports.imageRouter = router;
router.use(express_1.default.json());
function pickRandomImage() {
    var obj_keys = Object.keys(combos);
    const randIndex = Math.floor(Math.random() * obj_keys.length);
    const randKey = obj_keys[randIndex];
    const files = combos[randKey];
    const resJson = {
        key: randKey,
        images: files.images,
        photo: files.photo,
        painting: files.painting
    };
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
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const links = pickRandomImage();
            const query = req.query;
            req.data = links;
            //get build ranks
            next();
        });
    };
}
function insertResponse() {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const key = data.key;
            const overall = data.overall;
            const preserve = data.preserve;
            const style = data.style;
            const text = data.text;
            const rcode = yield index_1.default.query('INSERT INTO responses (key, overall, preserve, style, comments) VALUES ($1, $2, $3, $4, $5)', [key, overall, preserve, style, text]);
            res.status(200).send({ message: 'Data received successfully' });
            next();
        });
    };
}
router.route("/")
    .get([fetchImageNames()], (req, res) => {
    // console.log(req.data.detailInfo)
    // console.log(getStats(req.data.detailInfo.avatarDetailList[0]))
    // console.log(req.data.detailInfo.avatarDetailList[1].relicList)
    // getShield(req.data.detailInfo.avatarDetailList[0])
    res.json(req.data);
})
    .post([insertResponse()], (req, res) => {
});
router.get('/', (req, res) => {
    res.send(req.data);
});
router.route("/");
router.post('/', (req, res) => {
    // console.log('POST request received')
    // console.log('Content-Type:', req.headers['content-type'])
    // // @ts-ignore
    // console.log('req.body:', req.body)
});
