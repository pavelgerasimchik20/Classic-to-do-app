import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends mongoose.Document{
    email: string,
    password: string,
    token?: string,
    comparePassword?(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

userSchema.pre("save", async function(next) {

    const user = this as IUser;

    if(!user.isModified("password")) return next();

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    
    user.password = hash;

    return next();

})

userSchema.methods.comparePassword = async function(password: string) {
    const user = this as IUser;
    return bcrypt.compareSync(password, user.password);
}

const User = mongoose.model<IUser>("User", userSchema);

export default User;
