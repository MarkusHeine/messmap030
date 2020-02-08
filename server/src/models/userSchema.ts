import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import { promisify } from "util";

const compare = promisify(bcrypt.compare);

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    city: string;
    company: string;
    registerDate: Date;
    role: string;
    isCorrectPassword: (password: string) => Promise<boolean | undefined>;
}

const saltRounds = 10;

export const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    registerDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

UserSchema.pre("save", function(next) {
    if (this.isNew || this.isModified("password")) {
        const document = <IUser>this;
        bcrypt.hash(document.password, saltRounds, function(
            error,
            hashedPassword: string
        ) {
            if (error) {
                next(error);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        console.log("next");
        next();
    }
});

UserSchema.methods.isCorrectPassword = async function(password: string) {
    try {
        const match = await compare(password, this.password);
        return match;
    } catch (error) {
        console.log(error);
    }
};

export const User = mongoose.model<IUser>("User", UserSchema);
