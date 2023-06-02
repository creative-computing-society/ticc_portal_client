from rest_framework import serializers
from .models import User, Student, Booking


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'phone_number', 'is_ticc_counsellor', 'is_ticc_manager', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(password=password, **validated_data)
        return user

    def update(self, instance, validated_data):
        # Update specific fields
        instance.email = validated_data.get('email', instance.email)
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.is_ticc_counsellor = validated_data.get('is_ticc_counsellor', instance.is_ticc_counsellor)
        instance.is_ticc_manager = validated_data.get('is_ticc_manager', instance.is_ticc_manager)

        password = validated_data.get('password')
        if password:
            instance.set_password(password)

        instance.save()
        return instance



class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'user', 'roll_number', 'branch', 'admission_year', 'gender',]# 'appointments']

    user = UserSerializer(read_only=True)  # Use read_only=True to prevent user creation/update

    def update(self, instance, validated_data):
        # Update student fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    
 

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'slot', 'student', 'additional_info', 'remarks']
