from rest_framework import serializers
from users.models import Student


class StudentsListSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.CharField(source='user.email')
    username = serializers.CharField(source='user.username')

    class Meta:
        model = Student
        fields = ('id', 'first_name', 'last_name', 'email', 'username', 'user_id', )