import { Form, Row, Col, Select, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import './styles.css';
import LocationService from '../../services/location';

const Geography = () => {
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [wards, setWards] = useState([]);
    const { control, handleSubmit, watch, setValue } = useForm({
        province: '',
        city: '',
        ward: '',
    });

    const getProvinces = async () => {
        try {
            const provinces = await LocationService.getProvincesOrCities();
            setProvinces(provinces);
        } catch (error) {
            alert(error.message);
        }
    };

    const getCities = async (provinceId) => {
        if (!provinceId) {
            setCities([]);
            return;
        }
        try {
            const cities = await LocationService.getDistrictsOrCities(provinceId);
            setCities(cities);
        } catch (error) {
            alert(error.message);
        }
    };

    const getWards = async (cityId) => {
        if (!cityId) {
            setWards([]);
            return;
        }
        try {
            const wards = await LocationService.getWardsOrCommunes(cityId);
            setWards(wards);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        getProvinces();
    }, []);

    return (
        <div className='content'>
            <h1>Find Regional Planning</h1>
            <hr style={{ backgroundColor: '#fff' }} />
            <Form layout='vertical'>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item label='Province/City'>
                            <Controller
                                name='province'
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        allowClear
                                        showSearch
                                        size='large'
                                        placeholder='Select a province/city'
                                        onChange={getCities}
                                    >
                                        {provinces.map((province) => (
                                            <Select.Option
                                                key={province.id}
                                                value={province.idProvince}
                                            >
                                                {province.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                )}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='City/Disitrict'>
                            <Controller
                                name='city'
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        allowClear
                                        size='large'
                                        placeholder='Select a city/district'
                                        onChange={getWards}
                                    >
                                        {cities.map((city) => (
                                            <Select.Option key={city.id} value={city.idDistrict}>
                                                {city.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                )}
                            ></Controller>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='Ward/Commune'>
                            <Controller
                                name='ward'
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        allowClear
                                        size='large'
                                        placeholder='Select a ward/commune'
                                    >
                                        {wards.map((ward) => (
                                            <Select.Option key={ward.id} value={ward.idCommune}>
                                                {ward.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                )}
                            ></Controller>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item className='btn-submit'>
                            <Button type='primary' htmlType='submit' size='large'>
                                Find
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Geography;
