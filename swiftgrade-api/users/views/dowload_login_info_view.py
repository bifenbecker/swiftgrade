from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from django.shortcuts import HttpResponse

from assessments.services import CreateExcelFileService
from users.models import User
from users.serializers import StudentLoginInfoSerializer


class DownloadStudentLoginInfoView(GenericAPIView):
    """
        Create excel file with students info:
        First name, Last name, Username, Password
    """
    serializer_class = StudentLoginInfoSerializer

    def post(self, request, *args, **kwargs):
        """
            Returns excel file with student login info.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user_ids = serializer.validated_data['user_ids']
            passwords = serializer.validated_data['passwords']
            users = User.objects.filter(id__in=user_ids)
            excel_file_content = CreateExcelFileService.create_login_info_workbook(users, passwords)
            return HttpResponse(
                excel_file_content,
                content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            )
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)