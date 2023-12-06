import jwt from 'jsonwebtoken';

function jwtTokens({ id, email, first_name, last_name }) {
	const user = { id, email, first_name, last_name };
	const accessToken = jwt.sign(user, 'swsh23hjddnns');
	const refreshToken = jwt.sign(user, 'dhw782wujnd99ahmmakhanjkajikhiwn2n');
	return { accessToken, refreshToken };
}

export { jwtTokens };
