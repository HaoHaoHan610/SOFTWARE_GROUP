import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const SystemSettingsContainer = styled.div`
  max-width: 800px;
`;

const SettingsSection = styled.div`
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  font-size: 1.2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #9b59b6;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #9b59b6;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #9b59b6;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const InfoBox = styled.div`
  background-color: #e3f2fd;
  border: 1px solid #bbdefb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const InfoText = styled.p`
  color: #1976d2;
  margin: 0;
  font-size: 0.9rem;
`;

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    platformName: 'Vintage Watch Trading Platform',
    maintenanceMode: false,
    registrationEnabled: true,
    maxFileSize: '10',
    emailNotifications: true,
    smsNotifications: false,
    defaultCurrency: 'USD',
    timezone: 'UTC',
    supportEmail: 'support@vintagewatch.com',
    supportPhone: '+1 (555) 123-4567',
    termsOfService: 'Terms of service content would be here...',
    privacyPolicy: 'Privacy policy content would be here...'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // In a real application, this would save to the backend
    toast.success('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset to default values
      toast.info('Settings reset to default values');
    }
  };

  return (
    <SystemSettingsContainer>
      <SettingsSection>
        <SectionTitle>General Settings</SectionTitle>
        
        <FormGroup>
          <Label htmlFor="platformName">Platform Name</Label>
          <Input
            type="text"
            id="platformName"
            name="platformName"
            value={settings.platformName}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="defaultCurrency">Default Currency</Label>
          <Select
            id="defaultCurrency"
            name="defaultCurrency"
            value={settings.defaultCurrency}
            onChange={handleChange}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="JPY">JPY - Japanese Yen</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="timezone">Timezone</Label>
          <Select
            id="timezone"
            name="timezone"
            value={settings.timezone}
            onChange={handleChange}
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">London</option>
            <option value="Europe/Paris">Paris</option>
            <option value="Asia/Tokyo">Tokyo</option>
          </Select>
        </FormGroup>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button onClick={handleSave}>Save Settings</Button>
          <Button onClick={handleReset} style={{ background: '#95a5a6' }}>
            Reset to Default
          </Button>
        </div>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>Platform Access</SectionTitle>
        
        <FormGroup>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="maintenanceMode"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
            />
            <Label htmlFor="maintenanceMode" style={{ margin: 0 }}>
              Enable Maintenance Mode
            </Label>
          </div>
        </FormGroup>

        <FormGroup>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="registrationEnabled"
              name="registrationEnabled"
              checked={settings.registrationEnabled}
              onChange={handleChange}
            />
            <Label htmlFor="registrationEnabled" style={{ margin: 0 }}>
              Allow New User Registration
            </Label>
          </div>
        </FormGroup>

        <InfoBox>
          <InfoText>
            ⚠️ Maintenance mode will temporarily disable access to the platform for all users except administrators.
          </InfoText>
        </InfoBox>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>File Upload Settings</SectionTitle>
        
        <FormGroup>
          <Label htmlFor="maxFileSize">Maximum File Size (MB)</Label>
          <Input
            type="number"
            id="maxFileSize"
            name="maxFileSize"
            value={settings.maxFileSize}
            onChange={handleChange}
            min="1"
            max="100"
          />
        </FormGroup>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>Notification Settings</SectionTitle>
        
        <FormGroup>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="emailNotifications"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />
            <Label htmlFor="emailNotifications" style={{ margin: 0 }}>
              Enable Email Notifications
            </Label>
          </div>
        </FormGroup>

        <FormGroup>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="smsNotifications"
              name="smsNotifications"
              checked={settings.smsNotifications}
              onChange={handleChange}
            />
            <Label htmlFor="smsNotifications" style={{ margin: 0 }}>
              Enable SMS Notifications
            </Label>
          </div>
        </FormGroup>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>Support Information</SectionTitle>
        
        <FormGroup>
          <Label htmlFor="supportEmail">Support Email</Label>
          <Input
            type="email"
            id="supportEmail"
            name="supportEmail"
            value={settings.supportEmail}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="supportPhone">Support Phone</Label>
          <Input
            type="tel"
            id="supportPhone"
            name="supportPhone"
            value={settings.supportPhone}
            onChange={handleChange}
          />
        </FormGroup>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>Legal Documents</SectionTitle>
        
        <FormGroup>
          <Label htmlFor="termsOfService">Terms of Service</Label>
          <TextArea
            id="termsOfService"
            name="termsOfService"
            value={settings.termsOfService}
            onChange={handleChange}
            placeholder="Enter terms of service content..."
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="privacyPolicy">Privacy Policy</Label>
          <TextArea
            id="privacyPolicy"
            name="privacyPolicy"
            value={settings.privacyPolicy}
            onChange={handleChange}
            placeholder="Enter privacy policy content..."
          />
        </FormGroup>
      </SettingsSection>
    </SystemSettingsContainer>
  );
};

export default SystemSettings;
