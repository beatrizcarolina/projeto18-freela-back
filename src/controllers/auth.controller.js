import bcrypt from "bcrypt";
import { v4 as uuid} from "uuid";
import { checkPassword, createAddress, newSession, newUser, searchUser } from "../repositories/auth.repository.js";
import { deleteUser } from "../repositories/auth.repository.js";

export async function signup(req,res) {
    const { name, email, phone, cpf, password, confirmPassword } = req.body;

    try {
        const foundUser = await searchUser(email);
        if (foundUser) {
            return res.sendStatus(409).send("Email already registered");
        };

        if (password !== confirmPassword) {
            return res.status(422).send("Passwords doesn't match.");
        };

        const hash = bcrypt.hashSync(password, 10);
        await newUser(name, email, phone, cpf, hash);
        return res.sendStatus(201);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

async function checkAddress(cep, state, city) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
        return false;
    }

    if(data.uf === state && data.localidade === city) {
        return true;
    }
    return false;
};

export async function registerAdress (req, res) {
    const {email, cep, state, city} = req.body;

    try {
        const address = await checkAddress(cep, state, city);
        if (!address) {
            return res.status(400).send("State or city don't match cep");
        }

        await createAddress(email, cep, state, city, address);
        return res.sendStatus(201);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export async function signin(req,res) {
    const { email, password } = req.body;

    try {
        const foundUser = await searchUser(email);
        if (!foundUser) {
            return res.status(404).send("Email not registered");
        }

        const checkUser = await checkPassword(email, password);
        if (!checkUser) {
            return res.sendStatus(401).send("Wrong password");
        };

        const token = uuid();
        await newSession(checkUser.id, token);
        return res.status(200).send({ token });
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export async function signout(req,res) {
    const { token } = res.locals.session;

    try {
        await deleteUser(token);
        return res.sendStatus(204);        
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
