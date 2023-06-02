from rest_framework import generics, status, permissions, authentication
from .authentication import TokenAuthentication
from rest_framework.response import Response
from .models import User, Student, Booking
from .serializers import UserSerializer, StudentSerializer, BookingSerializer
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied, NotFound
from .permissions import IsTiccCounsellor, IsStudentOrTiccCounsellor, IsStudent
from slots.models import AvailableSlot
from rest_framework.views import APIView
 


class UserList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTiccCounsellor]
    authentication_classes = [TokenAuthentication]
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()


class UserDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStudentOrTiccCounsellor]
    authentication_classes = [TokenAuthentication]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        user = self.request.user
        user_id = self.request.data.get('id')
        # Allow the user to access their own details
        if user.id == user_id:
            return user
        # Allow ticc_counsellor users to access user details
        if user.is_ticc_counsellor:
            queryset = self.filter_queryset(self.get_queryset())
            obj = get_object_or_404(queryset, id=user_id)
            self.check_object_permissions(self.request, obj)
            return obj
        raise PermissionDenied("You are not authorized to access this resource.")
    

    def check_object_permissions(self, request, obj):
        user = request.user
        # Allow the user to access their own details
        if user == obj:
            return
        # Allow ticc_counsellor users to access user details
        if user.is_ticc_counsellor:
            return
        raise PermissionDenied("You are not authorized to access this resource.")




class StudentList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTiccCounsellor]
    authentication_classes = [TokenAuthentication, authentication.SessionAuthentication]
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied

class StudentDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStudentOrTiccCounsellor]
    authentication_classes = [TokenAuthentication, authentication.SessionAuthentication]
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get_object(self):
        user = self.request.user
        student_id = self.request.data.get('student_id')  # Assuming you pass the student_id in the request data

        # Allow the user to access their own student details
        if hasattr(user, 'student') and user.student.id == student_id:
            return user.student

        # Allow ticc_counsellor users to access student details
        if user.is_ticc_counsellor:
            queryset = self.filter_queryset(self.get_queryset())
            obj = get_object_or_404(queryset, id=student_id)
            self.check_object_permissions(self.request, obj)
            return obj

        raise PermissionDenied("You are not authorized to access this resource.")

    def check_object_permissions(self, request, obj):
        user = request.user
        student = obj

        # Allow the user to access their own student details
        if hasattr(user, 'student') and user.student == student:
            return

        # Allow ticc_counsellor users to access student details
        if user.is_ticc_counsellor:
            return

        raise PermissionDenied("You are not authorized to access this resource.")

 

class TiccCounsellorList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTiccCounsellor]
    authentication_classes = [TokenAuthentication, authentication.SessionAuthentication]
    queryset = User.objects.filter(is_ticc_counsellor=True)
    serializer_class = UserSerializer



class ListBookingsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStudentOrTiccCounsellor]
    authentication_classes = [TokenAuthentication, authentication.SessionAuthentication]
    serializer_class = BookingSerializer

    def get_queryset(self):
        user = self.request.user
        is_active = self.request.data.get('is_active')
        date = self.request.data.get('date')

        queryset = Booking.objects.all()

        if user.is_ticc_counsellor:
            if is_active is not None:
                queryset = queryset.filter(is_active=is_active)
            if date is not None:
                queryset = queryset.filter(slot__date=date)
        else:
            queryset = queryset.filter(student=user.student)
            if is_active is not None:
                queryset = queryset.filter(is_active=is_active)
            if date is not None:
                queryset = queryset.filter(slot__date=date)

        return queryset
    
class RetrieveBookingView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStudentOrTiccCounsellor]
    authentication_classes = [TokenAuthentication, authentication.SessionAuthentication]
    serializer_class = BookingSerializer

    def get_object(self):
        user = self.request.user
        booking_id = self.kwargs.get('booking_id')  # Assuming you pass the booking ID in the URL

        try:
            if user.is_ticc_counsellor:
                booking = Booking.objects.get(id=booking_id)
            else:
                booking = Booking.objects.get(id=booking_id, student=user.student)
        except Booking.DoesNotExist:
            return Response({'detail': 'Booking not found.'}, status=status.HTTP_404_NOT_FOUND)

        return booking
    


class CreateBookingView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStudent]
    authentication_classes = [TokenAuthentication, authentication.SessionAuthentication]
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        print("*****************1*****************")
        user = request.user
        student = user.student
        slot_id = request.data.get('slot_id')
        additional_info = request.data.get('additional_info')
        print("*****************2*****************")
        try:
            slot = AvailableSlot.objects.get(id=slot_id)
        except AvailableSlot.DoesNotExist:
            return Response({'detail': 'Slot not found.'}, status=status.HTTP_404_NOT_FOUND)
        print("*****************3*****************")
        if slot.capacity == slot.slots_booked or not slot.isAvailable:
            return Response({'detail': 'Slot is already booked.'}, status=status.HTTP_400_BAD_REQUEST)
        print("*****************4*****************")
        # Check if the student already has an appointment for the slot
        if student.bookings.filter(slot=slot).exists() or student.bookings.filter(slot__date=slot.date).exists():
            return Response({'detail': 'You already have an appointment today.'}, status=status.HTTP_400_BAD_REQUEST)
        print("*****************5*****************")
        print(slot)
        # Create the booking
        booking = Booking(student=student, slot=slot, additional_info=additional_info, is_active=True)
        booking.save()
        
        # Increment the slots_booked count for the slot
        slot.slots_booked += 1
        if slot.slots_booked == slot.capacity:
            slot.isAvailable = False
        slot.save()
        
        serializer = self.get_serializer(booking)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        

class CancelBookingView(APIView):
    permissions_classes = [permissions.IsAuthenticated, IsStudent]
    authentication_classes = [TokenAuthentication, authentication.SessionAuthentication]
    serializer_class = BookingSerializer

    def delete(self, request, *args, **kwargs):
        user = request.user
        booking_id = request.data.get('booking_id')
        
        # Check if the booking exists and belongs to the student
        try:
            booking = Booking.objects.get(id=booking_id, student=user.student)
        except Booking.DoesNotExist:
            return Response({'detail': 'Booking not found.'}, status=status.HTTP_404_NOT_FOUND)

        if not booking.is_active:
            return Response({'detail': 'Booking is already cancelled.'}, status=status.HTTP_400_BAD_REQUEST)

        booking.is_active = False
        booking.remarks = "Cancelled by student"
        booking.save()
        # Decrement the slots_booked count for the slot
        slot = booking.slot
        slot.slots_booked -= 1
        if slot.slots_booked < slot.capacity:
            slot.isAvailable = True
        slot.save()

        return Response({'detail': 'Booking cancelled successfully.'}, status=status.HTTP_204_NO_CONTENT)


class UpdateBookingView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsTiccCounsellor]
    
    
    def patch(self, request, *args, **kwargs):
        booking_id = request.data.get('booking_id')  # Assuming you pass the booking ID in the URL

        try:
            booking = Booking.objects.get(id=booking_id)
        except Booking.DoesNotExist:
            return Response({'detail': 'Booking not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = BookingSerializer(booking, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)