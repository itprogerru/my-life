import * as bcrypt from 'bcrypt';
import { User } from './user.entity';


describe('user entity', () => {
    let user: User;

    beforeEach(() => {
        user = new User();
        user.password = 'testPassword';
        user.salt = 'testSalt';
        bcrypt.hash = jest.fn();
    })

    describe('validatePassword', () => {
        it('returns true as password is valid', async () => {
            bcrypt.hash.mockResolvedValue('testPassword');
            expect(bcrypt.hash).not.toHaveBeenCalled();
            const result = await user.validatePassword('123456');
            expect(bcrypt.hash).toHaveBeenCalledWith('123456', 'testSalt');
            expect(result).toEqual(true);

        })
        it('returns false as password is invalid', async () => {
            bcrypt.hash.mockResolvedValue('wrongPassword');
            expect(bcrypt.hash).not.toHaveBeenCalled();
            const result = await user.validatePassword('wrongPassword');
            expect(bcrypt.hash).toHaveBeenCalledWith('wrongPassword', 'testSalt');
            expect(result).toEqual(false);
        })
    })
});
