
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FilterState {
  status: string;
  role: string;
  location: string;
  dateRange: string;
}

interface MemberFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

const MemberFilters = ({ filters, setFilters }: MemberFiltersProps) => {
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "suspended", label: "Suspended" }
  ];

  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "farmer", label: "Farmer" },
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" }
  ];

  const locationOptions = [
    { value: "all", label: "All Locations" },
    { value: "kigali", label: "Kigali" },
    { value: "eastern", label: "Eastern Province" },
    { value: "northern", label: "Northern Province" },
    { value: "southern", label: "Southern Province" },
    { value: "western", label: "Western Province" }
  ];

  const dateRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "last7", label: "Last 7 days" },
    { value: "last30", label: "Last 30 days" },
    { value: "last90", label: "Last 90 days" },
    { value: "thisYear", label: "This Year" }
  ];

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    setFilters({
      status: "all",
      role: "all",
      location: "all",
      dateRange: "all"
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "all");

  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">Filter Members</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Status Filter */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-2 block">Status</label>
          <div className="flex flex-wrap gap-1">
            {statusOptions.map((option) => (
              <Badge
                key={option.value}
                variant={filters.status === option.value ? "default" : "outline"}
                className={`cursor-pointer text-xs ${
                  filters.status === option.value 
                    ? "bg-green-600 text-white" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => updateFilter("status", option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Role Filter */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-2 block">Role</label>
          <div className="flex flex-wrap gap-1">
            {roleOptions.map((option) => (
              <Badge
                key={option.value}
                variant={filters.role === option.value ? "default" : "outline"}
                className={`cursor-pointer text-xs ${
                  filters.role === option.value 
                    ? "bg-green-600 text-white" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => updateFilter("role", option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-2 block">Location</label>
          <div className="flex flex-wrap gap-1">
            {locationOptions.map((option) => (
              <Badge
                key={option.value}
                variant={filters.location === option.value ? "default" : "outline"}
                className={`cursor-pointer text-xs ${
                  filters.location === option.value 
                    ? "bg-green-600 text-white" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => updateFilter("location", option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-2 block">Join Date</label>
          <div className="flex flex-wrap gap-1">
            {dateRangeOptions.map((option) => (
              <Badge
                key={option.value}
                variant={filters.dateRange === option.value ? "default" : "outline"}
                className={`cursor-pointer text-xs ${
                  filters.dateRange === option.value 
                    ? "bg-green-600 text-white" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => updateFilter("dateRange", option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberFilters;
