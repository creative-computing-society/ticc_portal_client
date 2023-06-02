from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Student, Booking

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'is_staff','is_ticc_counsellor', 'is_ticc_manager', 'is_superuser')
    list_filter = ('is_staff', 'is_ticc_counsellor', 'is_ticc_manager', 'is_superuser')
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()

    fieldsets = (
        (None, {'fields': ('email', 'password', 'full_name', 'phone_number')}),
        ('Permissions', {'fields': ('is_staff', 'is_ticc_counsellor', 'is_ticc_manager', 'is_superuser')}),
    )

    add_fieldsets = (
        (None, {'fields': ('email', 'password1', 'password2', 'full_name', 'phone_number')}),
        ('Permissions', {'fields': ('is_staff', 'is_ticc_counsellor', 'is_ticc_manager', 'is_superuser')}),
    ) 

    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)
        instance = form.instance
        if not change and not instance.is_ticc_counsellor:
            student, created = Student.objects.get_or_create(user=instance)
            if created:
                student.save()

admin.site.register(User, CustomUserAdmin)
admin.site.register(Student)
admin.site.register(Booking)