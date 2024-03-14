
// Third-party
import React, { useState } from 'react';
import { Box, Typography, Button, Checkbox, Backdrop, FormGroup, FormControlLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from 'next/link';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Stack } from '@mui/system';

// In the Project
import useRegister from '@/hook/auth/useRegister';
import CustomTextField from '@/app/authentication/components/forms/CustomTextField';
import CustomTypography from "@/app/authentication/components/forms/CustomTypography";


const AuthRegister = ({ title, subtitle, subtext }) => {

    const { registerUser, registerManager, checkName, checkEmail, checkPhone, checkPassWord,
        errName, errEmail, errPhone, errPassword, isErrorRegister
    } = useRegister()

    const [open, setOpen] = useState(false);                // Dùng cho  Backdrop điều khoản
    const [value, setValue] = useState('1');                // Dùng cho  Backdrop điều khoản
    const [isUser, setIsUser] = useState('user');           // Kiểm tra tài khoản đky là admin hay user
    const [isChecked, setIsChecked] = useState(false);      // Kiểm tra check chấp nhận điều khoản


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickRules = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeUser = (event) => {
        setIsUser(event.target.value);
    };

    const handleRegister = () => {
        console.log('errPhone', errPhone);
        if (isUser === 'user') registerUser()
        registerManager()
    }

    return (
        <>
            {title && (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            )}

            {subtext}
            {isErrorRegister ? (<CustomTypography>{isErrorRegister}</CustomTypography>) : null}
            <Backdrop // Điều khoản đăng ký
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 5 }}
                open={open}
            >
                <Box sx={{
                    position: 'relative',
                    height: '700px',
                    width: '600px',
                    typography: 'body1',
                    backgroundColor: '#fff',
                    zIndex: '15',
                    borderRadius: '7px',
                }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="tabs">
                                <Tab sx={{ fontWeight: '600' }} label="Dành cho đối tượng khách hàng" value="1" />
                                <Tab sx={{ fontWeight: '600' }} label="Dành cho đối tượng chủ cửa hàng" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                1. Giới Thiệu: Chào mừng bạn đến với opentable.com, nền tảng trực tuyến giúp bạn tìm kiếm và đặt trước bàn tại các cửa hàng coffee một cách dễ dàng và tiện lợi. Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu dưới đây.
                            </Typography>

                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                2. Dịch Vụ Được Cung Cấp: opentable.com cung cấp một nền tảng cho phép người dùng tìm kiếm, xem xét, và đặt trước bàn tại các cửa hàng coffee đối tác. Chúng tôi không phải là chủ sở hữu hoặc không trực tiếp quản lý các cửa hàng coffee này.
                            </Typography>

                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                3. Điều Kiện Sử Dụng: Người dùng cần đăng ký tài khoản để sử dụng một số tính năng của dịch vụ. Mỗi đặt trước được thực hiện thông qua opentable.com là một thỏa thuận trực tiếp giữa bạn và cửa hàng coffee đối tác. Bạn chịu trách nhiệm về việc kiểm tra thông tin đặt trước và đảm bảo tính chính xác của nó.
                            </Typography>

                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                4. Hạn Chế Trách Nhiệm: opentable.com không chịu trách nhiệm cho bất kỳ thiệt hại hoặc tổn thất nào phát sinh từ việc sử dụng dịch vụ, bao gồm nhưng không giới hạn ở những thất bại trong việc thực hiện đặt trước. Mọi khiếu nại liên quan đến dịch vụ cửa hàng coffee cần được đưa trực tiếp đến cửa hàng coffee đối tác.
                            </Typography>

                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                5. Quyền Sở Hữu Trí Tuệ: Mọi nội dung trên opentable.com, bao gồm văn bản, đồ họa, logo, và giao diện người dùng, đều thuộc quyền sở hữu của chúng tôi hoặc được chúng tôi sử dụng dưới sự cho phép.
                            </Typography>

                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                6. Thay Đổi Điều Khoản: opentable.com có quyền thay đổi điều khoản sử dụng vào bất kỳ thời điểm nào. Việc tiếp tục sử dụng dịch vụ sau khi các thay đổi được công bố sẽ coi là sự chấp nhận của bạn đối với những thay đổi đó.
                            </Typography>

                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                7. Liên Hệ: Nếu bạn có bất kỳ câu hỏi nào liên quan đến điều khoản sử dụng này, vui lòng liên hệ với chúng tôi thông qua opentable@gmail.org.
                            </Typography>
                        </TabPanel>
                        <TabPanel value="2">
                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                1. Tham gia Dịch Vụ: Bằng cách đăng ký và sử dụng dịch vụ của opentable.com, bạn chấp nhận và đồng ý tuân thủ các điều khoản và điều kiện được nêu dưới đây.
                            </Typography>

                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                2. Cung Cấp Thông Tin: Bạn đồng ý cung cấp thông tin chính xác và hoàn chỉnh về doanh nghiệp của bạn, bao gồm thông tin liên hệ, giờ hoạt động, và thông tin menu nếu có.
                            </Typography>

                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                3. Quản Lý Đặt Bàn: Bằng cách sử dụng dịch vụ của chúng tôi, bạn chịu trách nhiệm quản lý và xác nhận các đặt bàn từ khách hàng. Bạn cũng cần cập nhật thông tin về tình trạng đặt bàn một cách chính xác.
                            </Typography>

                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                4. Xử Lý Thanh Toán: Bạn chịu trách nhiệm xử lý thanh toán từ khách hàng theo các phương thức thanh toán đã được đồng ý trước đó, và đảm bảo tính bảo mật và an toàn của thông tin thanh toán.
                            </Typography>

                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                5. Chính Sách Hủy Đặt Bàn: Bạn cần cung cấp chính sách hủy đặt bàn rõ ràng và công bằng cho khách hàng, bao gồm thông tin về hạn chế thời gian và các khoản phí hủy bỏ có thể áp dụng.
                            </Typography>

                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                6. Đánh Giá và Phản Hồi: Bạn đồng ý xem xét và phản hồi đối với đánh giá và nhận xét từ khách hàng một cách tích cực và chuyên nghiệp để cải thiện trải nghiệm dịch vụ của mình.
                            </Typography>

                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                7. Tuân Thủ Pháp Luật: Bạn cam kết tuân thủ các quy định pháp luật và quy định liên quan đến việc cung cấp dịch vụ ẩm thực của bạn, bao gồm các quy định về an toàn thực phẩm, sức khỏe công cộng, và môi trường.
                            </Typography>

                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                8. Quy định xác thực: Sau khi đăng ký, Bạn cần cung cấp cho chúng tôi thêm 1 số thông tin xác thực về doanh nghiệp của Bạn thông qua hình ảnh, video đảm bảo theo yêu cầu của chúng tôi.
                            </Typography>

                            <Typography variant="subtitle2" fontWeight={500} mb="3px" textAlign="justify">
                                9. Khiếu nạy: Chúng tôi luôn đảm bảo quyền lợi cho các bạn. Tuy nhiên nếu có khiếu nạy xảy ra, quyết định cuối cùng thuộc về ban lảnh đạo của chúng tôi.
                            </Typography>
                        </TabPanel>

                        <Button
                            variant="contained"
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                margin: '20px',
                            }}
                            onClick={() => handleClose()}
                        >
                            Đóng
                        </Button>
                    </TabContext>
                </Box>

            </Backdrop>
            <Box>
                <Stack spacing={1}>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px">
                            Họ và Tên
                        </Typography>
                        <CustomTextField onChange={(event) => checkName(event.target.value)} id="name" variant="outlined" fullWidth />
                        {errName ? (<CustomTypography>{errName}</CustomTypography>) : ''}
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px" mt="25px">
                            Địa chỉ Email
                        </Typography>
                        <CustomTextField onChange={(event) => checkEmail(event.target.value)} id="email" variant="outlined" fullWidth />
                        {errEmail ? (<CustomTypography>{errEmail}</CustomTypography>) : ''}
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="phone" mb="5px" mt="25px">
                            Số điện thoại
                        </Typography>
                        <CustomTextField onChange={(event) => checkPhone(event.target.value)} id="phone" variant="outlined" fullWidth />
                        {errPhone ? (<CustomTypography>{errPhone}</CustomTypography>) : ''}
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px" mt="25px">
                            Mật khẩu
                        </Typography>
                        <CustomTextField onChange={(event) => checkPassWord(event.target.value)} id="password" variant="outlined" fullWidth />
                        {errPassword ? (<CustomTypography>{errPassword}</CustomTypography>) : ''}
                    </Box>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Loại tài khoản</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={isUser}
                            onChange={(e) => handleChangeUser(e)}
                        >
                            <FormControlLabel value='user' control={<Radio size="small" />} label="Khách hàng" />
                            <FormControlLabel value='manager' control={<Radio size="small" />} label="Người quản lý" />
                        </RadioGroup>
                    </FormControl>
                    <Stack spacing={1} direction="row" alignItems="center">
                        <FormGroup
                        >
                            <FormControlLabel
                                sx={{ marginRight: '-5px' }}
                                control={<Checkbox checked={isChecked} onClick={() => setIsChecked(!isChecked)} />}
                                label="Tôi đã đọc và chấp nhận các"
                            />
                        </FormGroup>
                        <Typography
                            variant="subtitle1"
                            fontWeight={500}
                            component="label"
                            ml="10px"
                            mb="5px"
                            mt="25px"
                            sx={{ cursor: 'pointer', textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '2px', }}
                            onClick={handleClickRules}
                        >
                            điều khoản
                        </Typography>
                    </Stack>
                </Stack>
                <Button
                    disabled={!(isChecked)}
                    onClick={() => handleRegister()}
                    color="primary"
                    variant="contained"
                    size="large" fullWidth>
                    Đăng ký
                </Button>
            </Box>

            {subtitle}
        </>
    );
};

export default AuthRegister;
